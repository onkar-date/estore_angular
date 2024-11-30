import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/interface/User.interface';
import { USER_ACTIONS } from './user.constants';

export const loginUser = createAction(
  USER_ACTIONS.LOGIN_USER,
  props<{ username: string; password: string }>()
);

export const loginUserSuccess = createAction(
  USER_ACTIONS.LOGIN_USER_SUCCESS,
  props<{ user: User }>()
);

export const loginUserFailure = createAction(
  USER_ACTIONS.LOGIN_USER_FAILURE,
  props<{ error: string }>()
);

export const logoutUser = createAction(USER_ACTIONS.LOGOUT_USER);
