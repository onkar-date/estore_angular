import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../shared/interface/Product.interface';
import { ProductService } from '../../shared/services/product.service';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { addItemToCart } from '../../store/cart/cart.actions';
import {
  setItemsToOrder,
  setOrderFromCart,
} from '../../store/order/order.actions';
import { OrderStateItem } from '../../store/order/order.models';

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
    private snackbarService: SnackbarService,
    private router: Router
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

  buyNow(): void {
    if (this.product) {
      this.store.dispatch(setOrderFromCart({ orderFromCart: false }));
      const orderItem: OrderStateItem = {
        product: this.product,
        quantity: 1,
        totalPrice: this.product.price,
      };
      this.store.dispatch(setItemsToOrder({ items: [orderItem] }));
      this.router.navigate(['order/place-order']);
    }
  }
}
