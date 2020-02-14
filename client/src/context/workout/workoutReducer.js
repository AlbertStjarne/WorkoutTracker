import { ADD_WORKOUT, UPDATE_WORKOUT, DELETE_WORKOUT } from '../types';

export default (state, action) => {
  switch (action.type) {
    //
    case ADD_WORKOUT:
      return {
        ...state,
        workouts: [...state.workouts, action.payload],
      };
    // default case
    default:
      return state;
  }
};
