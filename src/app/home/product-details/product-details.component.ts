import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../shared/interface/Product.interface';
import { ProductService } from '../../shared/services/product.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { addItemToCart } from '../../store/cart/cart.actions';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  productId: string | null = null;
  product: Product | null = null;
  addedToCart: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private store: Store<AppState>,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id');
      if (this.productId) {
        this.fetchProductDetails(this.productId);
      }
    });
  }

  fetchProductDetails(id: string): void {
    this.productService.getProductById(id).subscribe((product) => {
      this.product = product;
    });
  }

  addToCart(): void {
    if (this.product) {
      this.store.dispatch(addItemToCart({ product: this.product }));
      this.addedToCart = true;
      this.snackbarService.showSnackbar('Added to cart !');
    }
  }
}
