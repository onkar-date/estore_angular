import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USER_FEATURE_NAME } from './user.constants';
import { UserState } from './user.reducer';

export const selectUserState =
  createFeatureSelector<UserState>(USER_FEATURE_NAME);

export const selectLoggedInUser = createSelector(
  selectUserState,
  (state) => state.user
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const selectUserError = createSelector(
  selectUserState,
  (state) => state.error
);

export const selectUserToken = createSelector(
  selectUserState,
  (state) => state.user?.token
);
