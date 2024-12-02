import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { OrderService } from '../../shared/services/order.service';

import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import {
  fetchCustomerOrders,
  fetchCustomerOrdersFailure,
  fetchCustomerOrdersSuccess,
  fetchSellerOrders,
  fetchSellerOrdersFailure,
  fetchSellerOrdersSuccess,
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

  fetchCustomerOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCustomerOrders),
      switchMap((action) =>
        this.orderService.fetchCustomerOrders(action.customerId).pipe(
          map((customerOrders) =>
            fetchCustomerOrdersSuccess({ customerOrders })
          ),
          catchError((error) => of(fetchCustomerOrdersFailure({ error })))
        )
      )
    )
  );

  fetchSellerOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchSellerOrders),
      switchMap((action) =>
        this.orderService.fetchSellerOrders(action.sellerId).pipe(
          map((sellerOrders) =>
            fetchSellerOrdersSuccess({ sellerOrders })
          ),
          catchError((error) => of(fetchSellerOrdersFailure({ error })))
        )
      )
    )
  );
}
