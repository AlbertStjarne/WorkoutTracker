import React, { useReducer } from 'react';
import uuid from 'uuid';
import workoutContext from './workoutContext';
import workoutReducer from './workoutReducer';
import {
  ADD_WORKOUT,
  UPDATE_WORKOUT,
  DELETE_WORKOUT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_WORKOUTS,
  CLEAR_FILTER,
} from '../types';

const WorkoutState = props => {
  // initial state, with dummy data for now, later ''
  const initialState = {
    workouts: [
      {
        id: 1,
        description: 'Wednesday WOD',
        type: 'Strength',
        date: '2020-02-13',
      },
      {
        id: 2,
        description: 'Rowing',
        type: 'Conditioning',
        date: '2020-02-13',
      },
      {
        id: 3,
        description: 'Thursday WOD',
        type: 'Strength',
        date: '2020-02-13',
      },
      {
        id: 4,
        description: 'Ski Erg 2000m',
        type: 'Conditioning',
        date: '2020-02-13',
      },
    ],
    // setting current when clicking edit
    current: null,
    // array of filtered workouts
    filtered: null,
  };

  // pulling out state and dispatch from the reducer, state to access state and dispatch to dispatch to the reducer
  const [state, dispatch] = useReducer(workoutReducer, initialState);

  // ACTIONS
  // Add Workout
  const addWorkout = workout => {
    // using uuid for id before connecting to api
    workout.id = uuid.v4();
    // dispatching to reducer
    dispatch({ type: ADD_WORKOUT, payload: workout });
  };

  // Set current workout
  const setCurrent = workout => {
    dispatch({ type: SET_CURRENT, payload: workout });
  };

  // Clear current workout
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update Workout
  const updateWorkout = workout => {
    dispatch({ type: UPDATE_WORKOUT, payload: workout });
  };

  // Delete Workout
  const deleteWorkout = id => {
    dispatch({ type: DELETE_WORKOUT, payload: id });
  };

  // Filter workouts
  const filterWorkouts = text => {
    dispatch({ type: FILTER_WORKOUTS, payload: text });
  };

  // Clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // returning provider that will wrap the entire appl
  return (
    <workoutContext.Provider
      // value = what should be accessible from other components
      value={{
        workouts: state.workouts,
        current: state.current,
        filtered: state.filtered,
        addWorkout,
        deleteWorkout,
        updateWorkout,
        setCurrent,
        clearCurrent,
        filterWorkouts,
        clearFilter,
      }}
    >
      {props.children}
    </workoutContext.Provider>
  );
};

export default WorkoutState;
