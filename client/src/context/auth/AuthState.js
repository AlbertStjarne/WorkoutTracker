import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { REGISTER_SUCCESS } from '../types';

const AuthState = props => {
  // initial state, with dummy data for now, later ''
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null,
  };

  // pulling out state and dispatch from the reducer, state to access state and dispatch to dispatch to the reducer
  const [state, dispatch] = useReducer(authReducer, initialState);

  // ACTIONS
  // load user

  // register user

  // login user

  // returning provider that will wrap the entire appl
  return (
    <AuthContext.Provider
      // value = what should be accessible from other components
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
