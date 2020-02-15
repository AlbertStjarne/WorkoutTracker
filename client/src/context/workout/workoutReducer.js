import {
  ADD_WORKOUT,
  UPDATE_WORKOUT,
  DELETE_WORKOUT,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_WORKOUTS,
  CLEAR_FILTER,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    //
    case ADD_WORKOUT:
      return {
        ...state,
        workouts: [...state.workouts, action.payload],
      };
    case DELETE_WORKOUT:
      return {
        ...state,
        workouts: state.workouts.filter(
          workout => workout.id !== action.payload
        ),
      };
    case UPDATE_WORKOUT:
      return {
        ...state,
        workouts: state.workouts.map(workout =>
          workout.id === action.payload.id ? action.payload : workout
        ),
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_WORKOUTS:
      return {
        ...state,
        filtered: state.workouts.filter(workout => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return workout.description.match(regex) || workout.type.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    // default case
    default:
      return state;
  }
};
