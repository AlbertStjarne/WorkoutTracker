const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const router = express.Router();

const User = require('../models/User');
const Workout = require('../models/Workout');

// @route   GET api/workouts
// @desc    Get all workouts for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id }).sort({
      date: -1,
    });
    res.json(workouts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/workouts
// @desc    Add new workout
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('description')
        .not()
        .isEmpty(),
      check('type')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { description, type } = req.body;

    try {
      const newWorkout = new Workout({
        description,
        type,
        user: req.user.id,
      });

      // save workout to db
      const workout = await newWorkout.save();
      // return workout to client
      res.json(workout);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/workouts/:id
// @desc    Update workout
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { description, type } = req.body;

  // build workout object
  const workoutFields = {};
  if (description) workoutFields.description = description;
  if (type) workoutFields.type = type;

  try {
    let workout = await Workout.findById(req.params.id);

    if (!workout) return res.status(404).json({ msg: 'Workout not found' });

    // make sure user owns workout
    if (workout.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    // update workout
    workout = await Workout.findByIdAndUpdate(
      req.params.id,
      { $set: workoutFields },
      { new: true }
    );
    // return workout to client
    res.json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

  try {
    let workout = await Workout.findById();
  } catch (err) {}
});

// @route   DELETE api/workouts/:id
// @desc    Delete workout
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let workout = await Workout.findById(req.params.id);

    if (!workout) return res.status(404).json({ msg: 'Workout not found' });

    // make sure user owns workout
    if (workout.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not Authorized' });
    }

    // delete workout
    await Workout.findByIdAndRemove(req.params.id);
    // return message after delete
    res.json({ msg: 'Workout removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
