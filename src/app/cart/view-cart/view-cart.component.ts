import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../shared/interface/Cart.interface';
import { CartService } from '../../shared/services/cart.service';
import { Product } from '../../shared/interface/Product.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import {
  selectCart,
  selectCartItems,
  selectCartTotal,
} from '../../store/cart/cart.selectors';
import {
  decreaseQuantity,
  increaseQuantity,
  removeItemFromCart,
} from '../../store/cart/cart.actions';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.scss',
})
export class ViewCartComponent implements OnInit {
  cartItems$!: Observable<CartItem[]>;
  cartTotal$!: Observable<number>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.cartItems$ = this.store.select(selectCartItems);
    this.cartTotal$ = this.store.select(selectCartTotal);
  }

  getTotalPrice(item: CartItem): number {
    return item.product.price * item.quantity;
  }

  decreaseQuantity(productId: number): void {
    this.store.dispatch(decreaseQuantity({ itemId: productId }));
    // this.cartService.decreaseQuantity(productId);
  }

  increaseQuantity(productId: number): void {
    this.store.dispatch(increaseQuantity({ itemId: productId }));
    // this.cartService.increaseQuantity(productId);
  }

  removeFromCart(productId: number): void {
    // this.cartService.removeItemFromCart(productId);
    this.store.dispatch(removeItemFromCart({ itemId: productId }));
  }
}
