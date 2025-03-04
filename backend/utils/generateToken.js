import jwt from 'jsonwebtoken';

// Generate jwt token.
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Set JWT as HTTP-Only cookie
res.cookie('jwt', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production.
  sameSite: 'strict', // Prevent CRF attacks
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds.
});

export default generateToken;
