import express from 'express';
import checkObjectId from '../middleware/checkObjectId.js';
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from '../controllers/userController.js';

const router = express.Router();

// Route to register a new user or get all users.
// POST /api/users - Register a new user.
// GET /api/users - Get all users.
router.route('/').post(registerUser).get(getUsers);

// Route to authenticate a user.
// POST /api/users/login - Authenticate user and get token.
router.post('/login', authUser);

// Route to log out a user.
// POST /api/users/logout - Log out the current user.
router.post('/logout', logoutUser);

// Route to get or update user profile.
// GET /api/users/profile - Get user profile.
// PUT /api/users/profile - Update user profile.
router.route('/profile').get(getUserProfile).put(updateUserProfile);

// Routes to get, update, or delete a user by ID.
// DELETE /api/users/:id - Delete user by ID.
// GET /api/users/:id - Get user by ID.
// PUT /api/users/:id - Update user by ID.
router.route('/:id').delete(deleteUser).get(getUserById).put(updateUser);

export default router;
