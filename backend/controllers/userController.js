import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

/**
 * Authenticate the user.
 *******************************************************************************
 * @desc - Auth user & get token
 * @route - POST /api/users/login
 * @access - Public
 ********************************************************************************
 */
const authUser = asyncHandler(async (req, res) => {
  // Get email & password parameters from the request body.
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
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
  // Get name, email, & password parameters from the request body.
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists!');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data!');
  }
});

/**
 * Logout the user.
 *******************************************************************************
 * @desc - Logout user & clear cookie.
 * @route - POST /api/users/logout
 * @access - Private
 ********************************************************************************
 */
const logoutUser = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Loged out successfully!' });
};

/**
 * Get the user profile.
 *******************************************************************************
 * @desc - Get the user profile.
 * @route - GET /api/users/profile
 * @access - Private
 ********************************************************************************
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findOne(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
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
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
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
