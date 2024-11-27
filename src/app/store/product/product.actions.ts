import { createAction, props } from '@ngrx/store';
import { Product } from '../../shared/interface/Product.interface';
import { PRODUCT_ACTIONS } from './product.constants';

export const loadProducts = createAction(PRODUCT_ACTIONS.LOAD_PRODUCTS);

export const loadProductsSuccess = createAction(
  PRODUCT_ACTIONS.LOAD_PRODUCTS_SUCCESS,
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  PRODUCT_ACTIONS.LOAD_PRODUCTS_FAILURE,
  props<{ error: string }>()
);
