import { createReducer, on } from '@ngrx/store';
import {
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
} from './user.actions';
import { User } from '../../shared/interface/User.interface';

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const userReducer = createReducer(
  initialState,

  on(loginUser, (state) => ({
    ...state,
    loading: true,
  })),

  on(loginUserSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    error: null,
    user: user,
  })),

  on(loginUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(logoutUser, (state) => ({
    ...state,
    loading: false,
    user: null,
    error: null,
  }))
);
