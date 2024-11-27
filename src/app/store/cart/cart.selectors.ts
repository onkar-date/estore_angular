import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer'; // Import the CartState type
import { CART_FEATURE_NAME } from './cart.constants';

// Create a feature selector to select the cart feature state
export const selectCartState =
  createFeatureSelector<CartState>(CART_FEATURE_NAME);

// Selector to get the entire cart state
export const selectCart = createSelector(
  selectCartState,
  (state: CartState) => state
);

// Selector to get the list of items in the cart
export const selectCartItems = createSelector(
  selectCartState,
  (state: CartState) => state.items
);

// Selector to get the total price of the cart
export const selectCartTotal = createSelector(
  selectCartState,
  (state: CartState) => state.total
);

// Selector to get the loading state for the cart (if cart is being loaded)
export const selectCartLoading = createSelector(
  selectCartState,
  (state: CartState) => state.loading
);

// Selector to get any error message from the cart state
export const selectCartError = createSelector(
  selectCartState,
  (state: CartState) => state.error
);
