import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginUser, loginUserFailure, loginUserSuccess } from './user.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';

@Injectable()
export class UserEffects {
  actions$ = inject(Actions);
  constructor(private authService: AuthService) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      mergeMap((action) =>
        this.authService.login(action.username, action.password).pipe(
          map((user) => loginUserSuccess({ user })),
          catchError((error) => of(loginUserFailure({ error: error.message })))
        )
      )
    )
  );
}
