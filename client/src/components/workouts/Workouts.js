import React, { Fragment, useContext } from 'react';
import WorkoutContext from '../../context/workout/workoutContext';
import WorkoutItem from './WorkoutItem';

const Workouts = () => {
  const workoutContext = useContext(WorkoutContext);

  const { workouts } = workoutContext;

  return (
    <Fragment>
      {workouts.map(workout => (
        <WorkoutItem key={workout.id} workout={workout} />
      ))}
    </Fragment>
  );
};

export default Workouts;
