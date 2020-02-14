import React, { useState, useContext, useEffect } from 'react';
import WorkoutContext from '../../context/workout/workoutContext';

const WorkoutForm = () => {
  const workoutContext = useContext(WorkoutContext);

  const { addWorkout, updateWorkout, clearCurrent, current } = workoutContext;

  // setting form to current if current exist
  useEffect(() => {
    if (current !== null) {
      setWorkout(current);
    } else {
      setWorkout({
        description: '',
        type: '',
      });
    }
    // dependencies, only to trigger when workoutContext or current is changed
  }, [workoutContext, current]);

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
    if (current == null) {
      // calling addWorkout in workoutContext with the workout state object
      addWorkout(workout);
    } else {
      updateWorkout(workout);
    }
    // clearing form
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Workout' : 'Add Workout'}
      </h2>
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
        <input
          type='submit'
          value={current ? 'Update Workout' : 'Add Workout'}
          className='btn btn-primary'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default WorkoutForm;
