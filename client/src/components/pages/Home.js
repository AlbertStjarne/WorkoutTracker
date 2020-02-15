import React from 'react';
import Workouts from '../workouts/Workouts';
import WorkoutForm from '../workouts/WorkoutForm';
import WorkoutFilter from '../workouts/WorkoutFilter';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <WorkoutForm />
      </div>
      <div>
        <WorkoutFilter />
        <Workouts />
      </div>
    </div>
  );
};

export default Home;
