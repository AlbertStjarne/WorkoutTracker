import React, { useContext, useRef, useEffect } from 'react';
import WorkoutContext from '../../context/workout/workoutContext';

const WorkoutFilter = () => {
  const workoutContext = useContext(WorkoutContext);
  // initializing ref value
  const text = useRef('');

  const { filterWorkouts, clearFilter, filtered } = workoutContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  const onChange = e => {
    if (text.current.value !== '') {
      filterWorkouts(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter workouts...'
        onChange={onChange}
      />
    </form>
  );
};

export default WorkoutFilter;
