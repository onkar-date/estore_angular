export const ORDER_FEATURE_NAME = 'order';

export const ORDER_ACTIONS = {
  INIT_ORDER_STATE: '[Order] Init Order State',

  // Load Orders
  LOAD_ORDERS: '[Order] Load Orders',
  LOAD_ORDERS_SUCCESS: '[Order] Load Orders Success',
  LOAD_ORDERS_FAILURE: '[Order] Load Orders Failure',

  // Set Order Data
  SET_ITEMS_TO_ORDER: '[Order] Set Items To Order',
  CLEAR_ITEMS_TO_ORDER: '[Order] Clear Items To Order',
  SET_ORDER_FROM_CART: '[Order] Set Order From Cart',

  // Place Order
  INIT_PLACE_ORDER: '[Order] Init Place Order',
  PLACE_ORDER: '[Order] Place Order',
  PLACE_ORDER_SUCCESS: '[Order] Place Order Success',
  PLACE_ORDER_FAILURE: '[Order] Place Order Failure',

  // Customer Order Data
  FETCH_CUSTOMER_ORDERS: '[Order] Fetch Customer Orders',
  FETCH_CUSTOMER_ORDERS_SUCCESS: '[Order] Fetch Customer Orders Success',
  FETCH_CUSTOMER_ORDERS_FAILURE: '[Order] Fetch Customer Orders Failure',
};
