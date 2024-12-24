import { createAction, props } from '@ngrx/store';
import { Product } from '../../shared/interface/Product.interface';
import { PRODUCT_ACTIONS } from './product.constants';
import { PaginatedResponse } from '../../shared/interface/paginatedResponse.interface';

export const loadProducts = createAction(
  PRODUCT_ACTIONS.LOAD_PRODUCTS,
  props<{ page: number; searchKey?: string }>()
);

export const loadProductsSuccess = createAction(
  PRODUCT_ACTIONS.LOAD_PRODUCTS_SUCCESS,
  props<{ paginatedResponse: PaginatedResponse<Product> }>()
);

export const loadProductsFailure = createAction(
  PRODUCT_ACTIONS.LOAD_PRODUCTS_FAILURE,
  props<{ error: string }>()
);
