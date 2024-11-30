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
