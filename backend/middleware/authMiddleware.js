import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Protect route - user must be authenticated.
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT from 'jwt' cookie.
  token = req.cookies.jwt;

  if (token) {
    try {
      // Decode the token.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get the user details from decoded token with password omitted.
      req.user = await User.findById(decoded.userId).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized! - Token Failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized! - No Token');
  }
});

// Admin route - user must be an administrator (admin).
const admin = (req, res, next) => {
  if (req.user && req.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized! - Not Admin');
  }
};

export { protect, admin };
