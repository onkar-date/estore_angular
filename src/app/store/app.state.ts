import { ActionReducerMap } from '@ngrx/store';
import { PRODUCT_FEATURE_NAME } from './product/product.constants';
import * as fromProduct from './product/product.reducer';
import * as fromCart from './cart/cart.reducer';
import * as fromUser from './user/user.reducer';
import { CART_FEATURE_NAME } from './cart/cart.constants';
import { USER_FEATURE_NAME } from './user/user.constants';
import { ProductEffects } from './product/product.effects';
import { UserEffects } from './user/user.effects';

export interface AppState {
  [PRODUCT_FEATURE_NAME]: fromProduct.ProductState;
  [CART_FEATURE_NAME]: fromCart.CartState;
  [USER_FEATURE_NAME]: fromUser.UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  [PRODUCT_FEATURE_NAME]: fromProduct.productReducer,
  [CART_FEATURE_NAME]: fromCart.cartReducer,
  [USER_FEATURE_NAME]: fromUser.userReducer,
};

export const effects = [ProductEffects, UserEffects];
