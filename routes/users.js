const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const dotenv = require('dotenv');

const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Public
router.post(
  '/',
  [
    check('name', 'Please add a name')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // creating new user
      user = new User({
        name: name,
        email: email,
        password: password,
      });

      // create salt with 10 rounds
      const salt = await bcrypt.genSalt(10);
      // hashed version of the password
      user.password = await bcrypt.hash(password, salt);
      // save user to db
      await user.save();

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
