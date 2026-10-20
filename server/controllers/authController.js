import { authService } from '../services/authService.js';

export const authController = {
  signup(req, res) {
    try {
      const { name, email, password, phone } = req.body;
      const result = authService.signup({ name, email, password, phone });
      res.status(201).json({
        success: true,
        message: `Welcome to Farmers Mill, ${result.user.name}!`,
        data: result
      });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  login(req, res) {
    try {
      const { email, password } = req.body;
      const result = authService.loginWithPassword({ email, password });
      res.json({
        success: true,
        message: `Signed in successfully. Welcome back, ${result.user.name}!`,
        data: result
      });
    } catch (err) {
      res.status(401).json({ success: false, message: err.message });
    }
  },

  googleLogin(req, res) {
    try {
      const { email, name, avatar, googleId } = req.body;
      const result = authService.loginWithGoogle({ email, name, avatar, googleId });
      res.json({
        success: true,
        message: `Google authentication verified. Welcome, ${result.user.name}!`,
        data: result
      });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  appleLogin(req, res) {
    try {
      const { email, name, appleUserId } = req.body;
      const result = authService.loginWithApple({ email, name, appleUserId });
      res.json({
        success: true,
        message: `Apple Sign-In verified. Welcome, ${result.user.name}!`,
        data: result
      });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  passkeyRegisterChallenge(req, res) {
    try {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).json({ success: false, message: 'User ID is required to register a passkey.' });
      }
      const challenge = authService.generatePasskeyRegisterChallenge(userId);
      res.json({ success: true, data: challenge });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  passkeyRegisterVerify(req, res) {
    try {
      const { challengeId, credentialId, clientDataJSON, deviceName } = req.body;
      const result = authService.verifyAndRegisterPasskey({
        challengeId,
        credentialId,
        clientDataJSON,
        deviceName
      });
      res.status(201).json({
        success: true,
        message: 'Passkey registered successfully! You can now sign in with biometrics.',
        data: result
      });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  passkeyLoginChallenge(req, res) {
    try {
      const { email } = req.body;
      const challenge = authService.generatePasskeyLoginChallenge(email);
      res.json({ success: true, data: challenge });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  },

  passkeyLoginVerify(req, res) {
    try {
      const { challengeId, credentialId, email } = req.body;
      const result = authService.verifyPasskeyLogin({ challengeId, credentialId, email });
      res.json({
        success: true,
        message: `Biometric passkey verified! Welcome, ${result.user.name}.`,
        data: result
      });
    } catch (err) {
      res.status(401).json({ success: false, message: err.message });
    }
  },

  logout(req, res) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : req.body.token;
      authService.logout(token);
      res.json({ success: true, message: 'Signed out successfully.' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  getMe(req, res) {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : req.query.token;
      if (!token) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
      }
      const user = authService.getUserByToken(token);
      if (!user) {
        return res.status(401).json({ success: false, message: 'Session expired or invalid.' });
      }
      res.json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};

export default authController;
