import express from 'express';
import { authController } from '../controllers/authController.js';

const router = express.Router();

// Email & Password Auth
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Social & Modern Identity Providers
router.post('/google', authController.googleLogin);
router.post('/apple', authController.appleLogin);

// Passkey (FIDO2 / WebAuthn)
router.post('/passkey/register-challenge', authController.passkeyRegisterChallenge);
router.post('/passkey/register-verify', authController.passkeyRegisterVerify);
router.post('/passkey/login-challenge', authController.passkeyLoginChallenge);
router.post('/passkey/login-verify', authController.passkeyLoginVerify);

// Session & Profile
router.post('/logout', authController.logout);
router.get('/me', authController.getMe);

export default router;
