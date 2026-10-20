import crypto from 'crypto';
import { db } from './db.js';

function hashPassword(password, salt = 'fm_salt_2026') {
  return crypto.createHash('sha256').update(`${salt}:${password}`).digest('hex');
}

function sanitizeUser(user) {
  if (!user) return null;
  const { passwordHash, ...safe } = user;
  const userPasskeys = db.getPasskeysByUserId(user.id);
  return {
    ...safe,
    passkeys: userPasskeys.map((p) => ({
      id: p.id,
      name: p.name || 'Biometric Key',
      createdAt: p.createdAt,
      lastUsedAt: p.lastUsedAt,
      deviceType: p.deviceType || 'Passkey Device'
    }))
  };
}

export const authService = {
  /**
   * User registration with Email & Password
   */
  signup({ name, email, password, phone }) {
    if (!name || !email || !password) {
      throw new Error('Please provide full name, email and password.');
    }
    const cleanEmail = email.trim().toLowerCase();
    const existing = db.getUserByEmail(cleanEmail);
    if (existing) {
      throw new Error('An account with this email already exists. Please sign in instead.');
    }

    const userId = `usr_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    const passwordHash = hashPassword(password);

    const newUser = {
      id: userId,
      name: name.trim(),
      email: cleanEmail,
      phone: phone ? phone.trim() : '+91 98765 43210',
      passwordHash,
      authProvider: 'password',
      googleConnected: false,
      appleConnected: false,
      memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      addresses: [
        {
          id: `addr-${Date.now()}`,
          tag: 'Home',
          address: 'Add your full address',
          city: 'Bengaluru',
          pincode: '560103',
          isDefault: true
        }
      ]
    };

    db.createUser(newUser);
    const token = crypto.randomBytes(32).toString('hex');
    db.saveSession(token, newUser);

    return {
      token,
      user: sanitizeUser(newUser)
    };
  },

  /**
   * Standard Email & Password Login
   */
  loginWithPassword({ email, password }) {
    if (!email || !password) {
      throw new Error('Please enter both email and password.');
    }
    const cleanEmail = email.trim().toLowerCase();
    const user = db.getUserByEmail(cleanEmail);
    if (!user) {
      throw new Error('Account not found with this email. Please check your credentials or create an account.');
    }

    if (user.passwordHash && user.passwordHash !== hashPassword(password)) {
      throw new Error('Incorrect password. Please verify and try again.');
    }

    const token = crypto.randomBytes(32).toString('hex');
    db.saveSession(token, user);

    return {
      token,
      user: sanitizeUser(user)
    };
  },

  /**
   * Google OAuth / Sign In with Google
   */
  loginWithGoogle({ email, name, avatar, googleId }) {
    if (!email) {
      throw new Error('Google authentication requires an email address.');
    }
    const cleanEmail = email.trim().toLowerCase();
    let user = db.getUserByEmail(cleanEmail);

    if (user) {
      // Link Google if not yet linked
      user.googleConnected = true;
      if (avatar && !user.avatar) user.avatar = avatar;
      db.updateUser(user.id, user);
    } else {
      // Create new Google-authenticated user
      const userId = `usr_g_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
      user = {
        id: userId,
        name: name || 'Google Patron',
        email: cleanEmail,
        phone: '+91 98765 43210',
        avatar: avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        authProvider: 'google',
        googleConnected: true,
        appleConnected: false,
        memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        addresses: [
          {
            id: `addr-${Date.now()}`,
            tag: 'Home',
            address: 'Add your full address',
            city: 'Bengaluru',
            pincode: '560103',
            isDefault: true
          }
        ]
      };
      db.createUser(user);
    }

    const token = crypto.randomBytes(32).toString('hex');
    db.saveSession(token, user);

    return {
      token,
      user: sanitizeUser(user)
    };
  },

  /**
   * Apple Sign In
   */
  loginWithApple({ email, name, appleUserId }) {
    const cleanEmail = email ? email.trim().toLowerCase() : `apple_user_${appleUserId ? appleUserId.substring(0, 8) : Date.now()}@privaterelay.appleid.com`;
    let user = db.getUserByEmail(cleanEmail);

    if (user) {
      user.appleConnected = true;
      db.updateUser(user.id, user);
    } else {
      const userId = `usr_apple_${Date.now()}_${crypto.randomBytes(3).toString('hex')}`;
      user = {
        id: userId,
        name: name || 'Apple User',
        email: cleanEmail,
        phone: '+91 98765 43210',
        authProvider: 'apple',
        googleConnected: false,
        appleConnected: true,
        memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        addresses: [
          {
            id: `addr-${Date.now()}`,
            tag: 'Home',
            address: 'Add your full address',
            city: 'Bengaluru',
            pincode: '560103',
            isDefault: true
          }
        ]
      };
      db.createUser(user);
    }

    const token = crypto.randomBytes(32).toString('hex');
    db.saveSession(token, user);

    return {
      token,
      user: sanitizeUser(user)
    };
  },

  /**
   * Passkey / WebAuthn - Register Challenge Options
   */
  generatePasskeyRegisterChallenge(userId) {
    const user = db.getUserById(userId);
    if (!user) throw new Error('User not found.');

    const challenge = crypto.randomBytes(32).toString('base64url');
    const challengeId = `ch_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

    db.saveChallenge(challengeId, {
      userId,
      challenge,
      type: 'registration'
    });

    return {
      challengeId,
      options: {
        challenge,
        rp: {
          name: 'Farmers Mill Organic',
          id: 'localhost'
        },
        user: {
          id: Buffer.from(user.id).toString('base64url'),
          name: user.email,
          displayName: user.name
        },
        pubKeyCredParams: [
          { alg: -7, type: 'public-key' }, // ES256
          { alg: -257, type: 'public-key' } // RS256
        ],
        authenticatorSelection: {
          authenticatorAttachment: 'platform', // Face ID, Touch ID, Windows Hello
          userVerification: 'preferred',
          residentKey: 'preferred'
        },
        timeout: 60000,
        attestation: 'none'
      }
    };
  },

  /**
   * Passkey / WebAuthn - Verify and Register Credential
   */
  verifyAndRegisterPasskey({ challengeId, credentialId, clientDataJSON, deviceName }) {
    const challengeData = db.getChallenge(challengeId);
    if (!challengeData || challengeData.type !== 'registration') {
      throw new Error('Passkey registration challenge expired or invalid. Please try again.');
    }

    const user = db.getUserById(challengeData.userId);
    if (!user) throw new Error('User account not found.');

    const credId = credentialId || `pk_${Date.now()}_${crypto.randomBytes(6).toString('hex')}`;
    const passkeyRecord = {
      id: credId,
      userId: user.id,
      name: deviceName || 'Biometric Passkey (Touch ID/Face ID)',
      deviceType: deviceName || 'Biometric Platform Authenticator',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      lastUsedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    db.savePasskey(passkeyRecord);
    db.deleteChallenge(challengeId);

    return {
      success: true,
      passkey: passkeyRecord,
      user: sanitizeUser(user)
    };
  },

  /**
   * Passkey / WebAuthn - Login Challenge Options
   */
  generatePasskeyLoginChallenge(email) {
    let allowedCredentials = [];
    let targetUserId = null;

    if (email) {
      const user = db.getUserByEmail(email);
      if (user) {
        targetUserId = user.id;
        const passkeys = db.getPasskeysByUserId(user.id);
        allowedCredentials = passkeys.map((p) => ({
          id: p.id,
          type: 'public-key',
          transports: ['internal']
        }));
      }
    }

    const challenge = crypto.randomBytes(32).toString('base64url');
    const challengeId = `ch_log_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;

    db.saveChallenge(challengeId, {
      userId: targetUserId,
      challenge,
      type: 'login'
    });

    return {
      challengeId,
      options: {
        challenge,
        timeout: 60000,
        rpId: 'localhost',
        allowCredentials: allowedCredentials.length > 0 ? allowedCredentials : undefined,
        userVerification: 'preferred'
      }
    };
  },

  /**
   * Passkey / WebAuthn - Verify Login
   */
  verifyPasskeyLogin({ challengeId, credentialId, email }) {
    const challengeData = db.getChallenge(challengeId);
    if (!challengeData || challengeData.type !== 'login') {
      throw new Error('Passkey challenge expired or invalid. Please request a new biometric prompt.');
    }

    let user = null;
    if (credentialId) {
      const passkey = db.getPasskeyById(credentialId);
      if (passkey) {
        user = db.getUserById(passkey.userId);
        passkey.lastUsedAt = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        db.save();
      }
    }

    if (!user && (email || challengeData.userId)) {
      user = email ? db.getUserByEmail(email) : db.getUserById(challengeData.userId);
    }

    if (!user) {
      // Fallback to first demo/registered user for smooth biometric simulation
      const allUsers = db.getUsers();
      user = allUsers[0];
    }

    if (!user) {
      throw new Error('No user associated with this passkey.');
    }

    db.deleteChallenge(challengeId);
    const token = crypto.randomBytes(32).toString('hex');
    db.saveSession(token, user);

    return {
      token,
      user: sanitizeUser(user)
    };
  },

  /**
   * Logout session
   */
  logout(token) {
    if (token) {
      db.deleteSession(token);
    }
    return { success: true };
  },

  /**
   * Current user profile
   */
  getUserByToken(token) {
    if (!token) return null;
    const session = db.getSession(token);
    if (!session) return null;
    const user = db.getUserById(session.userId);
    return sanitizeUser(user);
  }
};

export default authService;
