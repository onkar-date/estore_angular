import { ActionReducerMap } from '@ngrx/store';
import { PRODUCT_FEATURE_NAME } from './product/product.constants';
import * as fromProduct from './product/product.reducer';
import * as fromCart from './cart/cart.reducer';
import * as fromUser from './user/user.reducer';
import * as fromOrder from './order/order.reducer';
import { CART_FEATURE_NAME } from './cart/cart.constants';
import { USER_FEATURE_NAME } from './user/user.constants';
import { ProductEffects } from './product/product.effects';
import { UserEffects } from './user/user.effects';
import { ORDER_FEATURE_NAME } from './order/order.constants';
import { OrderEffects } from './order/order.effects';

export interface AppState {
  [PRODUCT_FEATURE_NAME]: fromProduct.ProductState;
  [CART_FEATURE_NAME]: fromCart.CartState;
  [USER_FEATURE_NAME]: fromUser.UserState;
  [ORDER_FEATURE_NAME]: fromOrder.OrderState;
}

export const reducers: ActionReducerMap<AppState> = {
  [PRODUCT_FEATURE_NAME]: fromProduct.productReducer,
  [CART_FEATURE_NAME]: fromCart.cartReducer,
  [USER_FEATURE_NAME]: fromUser.userReducer,
  [ORDER_FEATURE_NAME]: fromOrder.orderReducer,
};

export const effects = [ProductEffects, UserEffects, OrderEffects];
