import { createReducer, on } from '@ngrx/store';
import { Product } from '../../shared/interface/Product.interface';
import {
  clearItemsToOrder,
  fetchCustomerOrders,
  fetchCustomerOrdersFailure,
  fetchCustomerOrdersSuccess,
  initOrderState,
  initPlaceOrder,
  placeOrder,
  placeOrderFailure,
  placeOrderSuccess,
  setItemsToOrder,
  setOrderFromCart,
} from './order.actions';
import { CustomerOrder, OrderStateItem } from './order.models';
import { ActionStatus } from '../../shared/enums/actionStatus.enum';

interface CustomerOrderState {
  loading: boolean;
  error: string | null;
  customerOrders: CustomerOrder[];
}
export interface OrderState {
  itemsToOrder: OrderStateItem[];
  orderFromCart: boolean;
  loading: boolean;
  error: string | null;
  placingOrder: boolean;
  placeOrderStatus: ActionStatus | null;

  customerOrderData: CustomerOrderState;
}

const initialState: OrderState = {
  itemsToOrder: [],
  orderFromCart: false,
  loading: false,
  error: null,
  placingOrder: false,
  placeOrderStatus: null,
  customerOrderData: {
    loading: false,
    error: null,
    customerOrders: [],
  },
};

export const orderReducer = createReducer(
  initialState,

  on(initOrderState, (state) => ({
    ...initialState,
  })),

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
  })),

  // Fetch Customer Order

  on(fetchCustomerOrders, (state) => ({
    ...state,
    customerOrderData: {
      ...state.customerOrderData,
      loading: true,
      error: null,
      customerOrders: [],
    },
  })),

  on(fetchCustomerOrdersSuccess, (state, { customerOrders }) => ({
    ...state,
    customerOrderData: {
      ...state.customerOrderData,
      loading: false,
      error: null,
      customerOrders,
    },
  })),

  on(fetchCustomerOrdersFailure, (state, { error }) => ({
    ...state,
    customerOrderData: {
      ...state.customerOrderData,
      loading: false,
      error: error.message,
      customerOrders: [],
    },
  }))
);
