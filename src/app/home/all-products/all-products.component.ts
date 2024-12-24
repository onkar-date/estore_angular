import { Router } from '@angular/router';
import { Product } from '../../shared/interface/Product.interface';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { loadProducts } from '../../store/product/product.actions';
import { Observable } from 'rxjs';
import {
  selectCurrentPage,
  selectProductPageSize,
  selectProducts,
  selectTotalProducts,
} from '../../store/product/product.selectors';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
})
export class AllProductsComponent implements OnInit {
  products$!: Observable<Product[]>;
  currentPage$!: Observable<number>;
  pageSize$!: Observable<number>;
  totalProducts$!: Observable<number>;
  searchKey: string = '';
  constructor(private router: Router, private store: Store<AppState>) {
    this.store.dispatch(loadProducts({ page: 0, searchKey: this.searchKey }));
  }

  ngOnInit(): void {
    this.products$ = this.store.select(selectProducts);
    this.currentPage$ = this.store.select(selectCurrentPage);
    this.pageSize$ = this.store.select(selectProductPageSize);
    this.totalProducts$ = this.store.select(selectTotalProducts);
  }

  showProductDetails(productId: number) {
    this.router.navigate([`home/product-details/${productId}`]);
  }

  handlePageEvent(event: PageEvent) {
    this.store.dispatch(
      loadProducts({ page: event.pageIndex, searchKey: this.searchKey })
    );
  }

  applySearch() {
    this.store.dispatch(loadProducts({ page: 0, searchKey: this.searchKey }));
  }
}
