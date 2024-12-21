import { createReducer, on } from '@ngrx/store';
import {
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
} from './product.actions';
import { Product } from '../../shared/interface/Product.interface';

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalItems: number;
  totalPages: number;
  pageSize: number;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  currentPage: 0,
  totalItems: 0,
  totalPages: 0,
  pageSize: 5,
};

export const productReducer = createReducer(
  initialState,

  on(loadProducts, (state) => ({
    ...state,
    loading: true,
  })),

  on(loadProductsSuccess, (state, { paginatedResponse }) => ({
    ...state,
    loading: false,
    error: null,
    products: paginatedResponse.content,
    currentPage: paginatedResponse.currentPage,
    totalItems: paginatedResponse.totalItems,
    totalPages: paginatedResponse.totalPages,
  })),

  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
