import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PRODUCT_FEATURE_NAME } from './product.constants';
import { ProductState } from './product.reducer';

export const selectProductState =
  createFeatureSelector<ProductState>(PRODUCT_FEATURE_NAME);

export const selectProducts = createSelector(
  selectProductState,
  (state) => state.products
);

export const selectProductLoading = createSelector(
  selectProductState,
  (state) => state.loading
);

export const selectProductError = createSelector(
  selectProductState,
  (state) => state.error
);

export const selectProductPageSize = createSelector(
  selectProductState,
  (state) => state.pageSize
);

export const selectCurrentPage = createSelector(
  selectProductState,
  (state) => state.currentPage
);

export const selectTotalProducts = createSelector(
  selectProductState,
  (state) => state.totalItems
);

export const selectTotalPages = createSelector(
  selectProductState,
  (state) => state.totalPages
);
