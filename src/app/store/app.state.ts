import { ActionReducerMap } from '@ngrx/store';
import { PRODUCT_FEATURE_NAME } from './product/product.constants';
import * as fromProduct from './product/product.reducer';
import * as fromCart from './cart/cart.reducer';
import { CART_FEATURE_NAME } from './cart/cart.constants';

export interface AppState {
  [PRODUCT_FEATURE_NAME]: fromProduct.ProductState;
  [CART_FEATURE_NAME]: fromCart.CartState;
}

export const reducers: ActionReducerMap<AppState> = {
  [PRODUCT_FEATURE_NAME]: fromProduct.productReducer,
  [CART_FEATURE_NAME]: fromCart.cartReducer,
};
