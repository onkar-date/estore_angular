import { createReducer, on } from '@ngrx/store';
import { Product } from '../../shared/interface/Product.interface';
import {
  clearItemsToOrder,
  initPlaceOrder,
  placeOrder,
  placeOrderFailure,
  placeOrderSuccess,
  setItemsToOrder,
  setOrderFromCart,
} from './order.actions';
import { OrderStateItem } from './order.models';
import { ActionStatus } from '../../shared/enums/actionStatus.enum';

export interface OrderState {
  itemsToOrder: OrderStateItem[];
  orderFromCart: boolean;
  loading: boolean;
  error: string | null;
  placingOrder: boolean;
  placeOrderStatus: ActionStatus | null;
}

const initialState: OrderState = {
  itemsToOrder: [],
  orderFromCart: false,
  loading: false,
  error: null,
  placingOrder: false,
  placeOrderStatus: null,
};

export const orderReducer = createReducer(
  initialState,

  on(setItemsToOrder, (state, { items }) => ({
    ...state,
    itemsToOrder: items,
  })),

  on(clearItemsToOrder, (state) => ({
    ...state,
    itemsToOrder: [],
  })),

  on(setOrderFromCart, (state, { orderFromCart }) => ({
    ...state,
    orderFromCart,
  })),

  on(initPlaceOrder, (state) => ({
    ...state,
    itemsToOrder: [],
    orderFromCart: false,
    placingOrder: false,
    placeOrderStatus: null,
  })),

  on(placeOrder, (state) => ({
    ...state,
    loading: false,
    error: null,
    placingOrder: true,
    placeOrderStatus: null,
  })),

  on(placeOrderSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
    placingOrder: false,
    placeOrderStatus: ActionStatus.SUCCESS,
  })),

  on(placeOrderFailure, (state) => ({
    ...state,
    loading: false,
    error: null,
    placingOrder: false,
    placeOrderStatus: ActionStatus.FAILURE,
  }))
);
