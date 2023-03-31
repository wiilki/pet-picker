const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const createToken = (user) => {
  const payload = {
    user: {
      id: user._id
    }
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.user;
  } catch (err) {
    return null;
  }
};

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied' });
  }

  const user = verifyToken(token);
  if (!user) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    const foundUser = await User.findById(user.id).select('-password');
    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = foundUser;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createToken,
  verifyToken,
  authenticate
};
