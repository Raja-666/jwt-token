const UserModal = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModal.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email is Invalid' });
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '2m' });
        return res.status(200).json({ message: 'Login SuccessFully', token });
      } else {
        return res.status(401).json({ message: 'Password is Invalid' });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token.' });

    req.userId = decoded.id;
    next();
  });
};

module.exports = { handleLogin, verifyToken };
