import React, { Fragment, useContext } from 'react';
import WorkoutContext from '../../context/workout/workoutContext';
import WorkoutItem from './WorkoutItem';

const Workouts = () => {
  const workoutContext = useContext(WorkoutContext);

  const { workouts, filtered } = workoutContext;

  if (workouts.length === 0) {
    return <h4>Please Add A Workout</h4>;
  }

  return (
    <Fragment>
      {/* if filtered is not null then showing filtered, else showing workouts */}
      {filtered !== null
        ? filtered.map(workout => (
            <WorkoutItem key={workout.id} workout={workout} />
          ))
        : workouts.map(workout => (
            <WorkoutItem key={workout.id} workout={workout} />
          ))}
    </Fragment>
  );
};

export default Workouts;
