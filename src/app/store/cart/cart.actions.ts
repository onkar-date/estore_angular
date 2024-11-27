import { createAction, props } from '@ngrx/store';
import { CART_ACTIONS } from './cart.constants';
import { Product } from '../../shared/interface/Product.interface';

export const getCart = createAction(CART_ACTIONS.GET_CART);

export const addItemToCart = createAction(
  CART_ACTIONS.ADD_TO_CART,
  props<{ product: Product }>()
);

export const removeItemFromCart = createAction(
  CART_ACTIONS.REMOVE_FROM_CART,
  props<{ itemId: number }>()
);

export const increaseQuantity = createAction(
  CART_ACTIONS.INCREASE_ITEM_QUANTITY,
  props<{ itemId: number }>()
);

export const decreaseQuantity = createAction(
  CART_ACTIONS.DECREASE_ITEM_QUANTITY,
  props<{ itemId: number }>()
);

export const clearCart = createAction(CART_ACTIONS.CLEAR_CART);
