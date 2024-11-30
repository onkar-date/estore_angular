import { Router } from '@angular/router';
import { Product } from '../../shared/interface/Product.interface';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { loadProducts } from '../../store/product/product.actions';
import { Observable } from 'rxjs';
import { selectProducts } from '../../store/product/product.selectors';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
})
export class AllProductsComponent implements OnInit {
  products$!: Observable<Product[]>;

  constructor(private router: Router, private store: Store<AppState>) {
    this.store.dispatch(loadProducts());
  }

  ngOnInit(): void {
    this.products$ = this.store.select(selectProducts);
  }

  showProductDetails(productId: number) {
    this.router.navigate([`home/product-details/${productId}`]);
  }
}
