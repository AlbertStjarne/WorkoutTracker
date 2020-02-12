import React, { useReducer } from 'react';
import uuid from 'uuid';
import workoutContext from './workoutContext';
import workoutReducer from './workoutReducer';
import { ADD_WORKOUT, UPDATE_WORKOUT, DELETE_WORKOUT } from '../types';

const WorkoutState = props => {
  // initial state, with dummy data for now, later ''
  const initialState = {
    workouts: [
      {
        id: 1,
        description: 'Wednesday WOD',
        type: 'Strength',
      },
      {
        id: 2,
        description: 'Rowing',
        type: 'Conditioning',
      },
      {
        id: 3,
        description: 'Thursday WOD',
        type: 'Strength',
      },
      {
        id: 4,
        description: 'Ski Erg 2000m',
        type: 'Conditioning',
      },
    ],
  };

  // pulling out state and dispatch from the reducer, state to access state and dispatch to dispatch to the reducer
  const [state, dispatch] = useReducer(workoutReducer, initialState);

  // ACTIONS
  // Add Workout

  // Update Workout

  // Delete Contact

  // returning provider that will wrap the entire appl
  return (
    <workoutContext.Provider
      // value = what should be accessible from other components
      value={{
        workouts: state.workouts,
      }}
    >
      {props.children}
    </workoutContext.Provider>
  );
};

export default WorkoutState;