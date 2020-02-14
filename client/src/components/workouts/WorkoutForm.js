import React, { useState, useContext } from 'react';
import WorkoutContext from '../../context/workout/workoutContext';

const WorkoutForm = () => {
  const workoutContext = useContext(WorkoutContext);

  // setting workout state to an object
  const [workout, setWorkout] = useState({
    description: '',
    type: '',
  });

  // destructuring from workout state
  const { description, type } = workout;

  // setting workout state to old state + new state
  const onChange = e => {
    setWorkout({ ...workout, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    // calling addWorkout in workoutContext with the workout state object
    workoutContext.addWorkout(workout);
    // clearing form
    setWorkout({
      description: '',
      type: '',
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>Add Workout</h2>
      <input
        type='text'
        placeholder='Description'
        name='description'
        value={description}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Type'
        name='type'
        value={type}
        onChange={onChange}
      />
      <div>
        <input type='submit' value='Add Workout' className='btn btn-primary' />
      </div>
    </form>
  );
};

export default WorkoutForm;
