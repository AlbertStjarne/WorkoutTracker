import React from 'react';
import Workouts from '../workouts/Workouts';

const Home = () => {
  return (
    <div className='grid-2'>
      <div>Workout Form here</div>
      <div>
        <Workouts />
      </div>
    </div>
  );
};

export default Home;
