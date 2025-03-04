import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

/**
 * Authenticate the user.
 *******************************************************************************
 * @desc - Auth user & get token
 * @route - POST /api/users/login
 * @access - Public
 ********************************************************************************
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    // Set JWT as HTTP-Only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

/**
 * Register the user.
 *******************************************************************************
 * @desc - Register user.
 * @route - POST /api/users
 * @access - Public
 ********************************************************************************
 */
const registerUser = asyncHandler(async (req, res) => {
  res.send('register user');
});

/**
 * Logout the user.
 *******************************************************************************
 * @desc - Logout user & clear cookie.
 * @route - POST /api/users/logout
 * @access - Private
 ********************************************************************************
 */
const logoutUser = asyncHandler(async (req, res) => {
  res.send('logout user');
});

/**
 * Get the user profile.
 *******************************************************************************
 * @desc - Get the user profile.
 * @route - GET /api/users/profile
 * @access - Private
 ********************************************************************************
 */
const getUserProfile = asyncHandler(async (req, res) => {
  res.send('get user profile');
});

/**
 * Update user profile.
 *******************************************************************************
 * @desc - Update user profile.
 * @route - PUT /api/users/profile
 * @access - Private
 ********************************************************************************
 */
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('update user profile');
});

/**
 * Get all the available users (ADMIN)
 *******************************************************************************
 * @desc - Get all users.
 * @route - GET /api/users
 * @access - Private (ADMIN)
 ********************************************************************************
 */
const getUsers = asyncHandler(async (req, res) => {
  res.send('get users');
});

/**
 * Get a single user by id (ADMIN)
 *******************************************************************************
 * @desc - Get a single user by id.
 * @route - GET /api/users/:id
 * @access - Private (ADMIN)
 ********************************************************************************
 */
const getUserById = asyncHandler(async (req, res) => {
  res.send('get user');
});

/**
 * Delete the user (ADMIN)
 *******************************************************************************
 * @desc - Delete the user.
 * @route - DELETE /api/users/:id
 * @access - Private (ADMIN)
 ********************************************************************************
 */
const deleteUser = asyncHandler(async (req, res) => {
  res.send('delete user');
});

/**
 * Update the user (ADMIN)
 *******************************************************************************
 * @desc - Update the user
 * @route - PUT /api/users/:id
 * @access - Private (ADMIN)
 ********************************************************************************
 */
const updateUser = asyncHandler(async (req, res) => {
  res.send('update user');
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
