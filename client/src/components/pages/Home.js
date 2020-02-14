import React from 'react';
import Workouts from '../workouts/Workouts';
import WorkoutForm from '../workouts/WorkoutForm';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <WorkoutForm />
      </div>
      <div>
        <Workouts />
      </div>
    </div>
  );
};

export default Home;
