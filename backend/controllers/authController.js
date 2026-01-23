// controllers/authController.js

const { User } = require('../models'); // adjust path if needed
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// REGISTER new user
const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user exists
    const email = req.body.email.trim().toLowerCase();
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    //const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    // Return response with JWT
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id, user.role),
    });

  } catch (error) {
    console.error('REGISTER ERROR:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// LOGIN user
// const login = async (req, res) => {
//   const { email, password } = req.body;
//   console.log('Login attempt for email:', email);
//   console.log('Password provided:', password);

//   try {
//     // Find user by email
//     const user = await User.findOne({ where: { email } });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password hehe' });
//     }
//     console.log('User found:', user);

//     // Compare password
//     const encriptedPassword = bcrypt.decodeBase64(password);
//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log('Password match result:', encriptedPassword);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid email or password rrrr' });
//     }

//     // Return response with JWT
//     res.json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       token: generateToken(user.id, user.role),
//     });

//   } catch (error) {
//     console.error('LOGIN ERROR:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password123123' });
    }

    // Compare plaintext password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password111111111' });
    }

    // Return JWT and user info
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id, user.role),
    });

  } catch (error) {
    console.error('LOGIN ERROR:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login };
