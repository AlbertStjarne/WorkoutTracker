const express = require('express');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
// auth as 2nd param to run the auth middleware
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    console.log(user);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Auth user and get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // checking password if the user exists, comparing entered password with password from db
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // if matching password
      // payload for jwt
      const payload = {
        user: {
          id: user.id,
        },
      };

      // create jwt
      jwt.sign(
        payload,
        process.env.jwtSecret,
        {
          // token valid for 10h
          expiresIn: 36000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
