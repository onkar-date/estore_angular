import { createAction, props } from '@ngrx/store';
import { ORDER_ACTIONS } from './order.constants';
import { Product } from '../../shared/interface/Product.interface';
import { Order, OrderRequest } from '../../shared/interface/order.interface';
import { CustomerOrder, OrderStateItem } from './order.models';
import { HttpErrorResponse } from '@angular/common/http';

export const setItemsToOrder = createAction(
  ORDER_ACTIONS.SET_ITEMS_TO_ORDER,
  props<{ items: OrderStateItem[] }>()
);

export const clearItemsToOrder = createAction(
  ORDER_ACTIONS.CLEAR_ITEMS_TO_ORDER
);

export const setOrderFromCart = createAction(
  ORDER_ACTIONS.SET_ORDER_FROM_CART,
  props<{ orderFromCart: boolean }>()
);

export const placeOrder = createAction(
  ORDER_ACTIONS.PLACE_ORDER,
  props<{ order: OrderRequest }>()
);

export const placeOrderSuccess = createAction(
  ORDER_ACTIONS.PLACE_ORDER_SUCCESS,
  props<{ placedOrder: Order }>()
);

export const placeOrderFailure = createAction(
  ORDER_ACTIONS.PLACE_ORDER_FAILURE,
  props<{ error: string }>()
);

export const initPlaceOrder = createAction(ORDER_ACTIONS.INIT_PLACE_ORDER);

// Fetch Customer Order
export const fetchCustomerOrders = createAction(
  ORDER_ACTIONS.FETCH_CUSTOMER_ORDERS,
  props<{ customerId: number }>()
);

export const fetchCustomerOrdersSuccess = createAction(
  ORDER_ACTIONS.FETCH_CUSTOMER_ORDERS_SUCCESS,
  props<{ customerOrders: CustomerOrder[] }>()
);

export const fetchCustomerOrdersFailure = createAction(
  ORDER_ACTIONS.FETCH_CUSTOMER_ORDERS_FAILURE,
  props<{ error: HttpErrorResponse }>()
);
