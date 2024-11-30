import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable, switchMap, take } from 'rxjs';
import { AppState } from '../store/app.state';
import { selectAuthToken } from '../store/user/user.selectors';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.store.select(selectAuthToken).pipe(
      take(1),
      switchMap((token) => {
        if (token) {
          const clonedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next.handle(clonedReq);
        }
        return next.handle(req);
      })
    );
  }
}
