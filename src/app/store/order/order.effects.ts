import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrderService } from '../../shared/services/order.service';

import { catchError, map, mergeMap, of } from 'rxjs';
import {
  placeOrder,
  placeOrderFailure,
  placeOrderSuccess,
} from './order.actions';

@Injectable()
export class OrderEffects {
  actions$ = inject(Actions);
  constructor(private orderService: OrderService) {}

  placeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(placeOrder),
      mergeMap((action) =>
        this.orderService.placeOrder(action.order).pipe(
          map((placedOrder) => placeOrderSuccess({ placedOrder })),
          catchError((error) => of(placeOrderFailure({ error })))
        )
      )
    )
  );
}
