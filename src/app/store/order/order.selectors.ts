import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ORDER_FEATURE_NAME } from './order.constants';
import { OrderState } from './order.reducer';

export const selectOrderState =
  createFeatureSelector<OrderState>(ORDER_FEATURE_NAME);

export const selectItemsToOrder = createSelector(
  selectOrderState,
  (state) => state.itemsToOrder
);

export const selectOrderFromCart = createSelector(
  selectOrderState,
  (state) => state.orderFromCart
);

export const selectOrderTotal = createSelector(selectOrderState, (state) =>
  state.itemsToOrder.reduce((prevVal, currentItem) => {
    return prevVal + currentItem.product.price * currentItem.quantity;
  }, 0)
);

export const selectPlaceOrderStatus = createSelector(
  selectOrderState,
  (state) => state.placeOrderStatus
);

// Customer Order
export const selectCustomerOrders = createSelector(
  selectOrderState,
  (state) => state.customerOrderData.customerOrders
);

export const selectCustomerOrdersLoading = createSelector(
  selectOrderState,
  (state) => state.customerOrderData.loading
);

export const selectCustomerOrdersError = createSelector(
  selectOrderState,
  (state) => state.customerOrderData.error
);


// Seller Order
export const selectSellerOrders = createSelector(
  selectOrderState,
  (state) => state.sellerOrderData.sellerOrders
);

export const selectSellerOrdersLoading = createSelector(
  selectOrderState,
  (state) => state.sellerOrderData.loading
);

export const selectSellerOrdersError = createSelector(
  selectOrderState,
  (state) => state.sellerOrderData.error
);