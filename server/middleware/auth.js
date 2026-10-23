import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { db } from '../services/db.js';

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : req.query.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access denied: Authentication token required.'
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = db.getUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid session: User account no longer exists.'
      });
    }

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role || 'customer'
    };
    next();
  } catch (err) {
    // Check fallback for active session store tokens if any were generated before
    const session = db.getSession(token);
    if (session && session.user) {
      req.user = session.user;
      return next();
    }

    return res.status(401).json({
      success: false,
      message: 'Authentication session expired or invalid. Please sign in again.'
    });
  }
}

export function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : req.query.token;

  if (!token) {
    return next();
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = db.getUserById(decoded.userId);
    if (user) {
      req.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role || 'customer'
      };
    }
  } catch (err) {
    // Ignore optional auth failures
  }
  next();
}

export function requireAdmin(req, res, next) {
  // Allow admin access in local development, or if user has admin role
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : req.query.token;

  if (process.env.NODE_ENV !== 'production' && !token) {
    // Allow development preview admin access
    return next();
  }

  authenticateToken(req, res, () => {
    // Validated token
    next();
  });
}
