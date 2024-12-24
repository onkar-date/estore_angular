import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../shared/services/product.service';
import {
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
} from './product.actions';
import { catchError, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { selectProductPageSize } from './product.selectors';

@Injectable()
export class ProductEffects {
  actions$ = inject(Actions);
  store = inject(Store<AppState>);
  constructor(private productService: ProductService) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      withLatestFrom(this.store.select(selectProductPageSize)),
      mergeMap(([action, pageSize]) =>
        this.productService
          .getProducts(action.page, pageSize, action.searchKey)
          .pipe(
            map((paginatedResponse) =>
              loadProductsSuccess({ paginatedResponse })
            ),
            catchError((error) =>
              of(loadProductsFailure({ error: error.message }))
            )
          )
      )
    )
  );
}
