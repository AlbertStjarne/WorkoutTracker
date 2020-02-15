import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
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
      <TransitionGroup>
        {/* if filtered is not null then showing filtered, else showing workouts */}
        {filtered !== null
          ? filtered.map(workout => (
              <CSSTransition key={workout.id} timeout={500} classNames='item'>
                <WorkoutItem workout={workout} />
              </CSSTransition>
            ))
          : workouts.map(workout => (
              <CSSTransition key={workout.id} timeout={500} classNames='item'>
                <WorkoutItem workout={workout} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Workouts;
