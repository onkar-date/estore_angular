import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartItem } from '../../shared/interface/Cart.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
  selectCartItems,
  selectCartTotal,
} from '../../store/cart/cart.selectors';
import {
  decreaseQuantity,
  increaseQuantity,
  removeItemFromCart,
} from '../../store/cart/cart.actions';
import {
  setItemsToOrder,
  setOrderFromCart,
} from '../../store/order/order.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.scss',
})
export class ViewCartComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  cartItems!: CartItem[];
  cartTotal$!: Observable<number>;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit(): void {
    this.store
      .select(selectCartItems)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.cartItems = data));
    this.cartTotal$ = this.store.select(selectCartTotal);
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Emit a value to signal completion
    this.destroy$.complete(); // Complete the destroy$ subject
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

  placeOrder(): void {
    this.store.dispatch(
      setItemsToOrder({
        items: this.cartItems,
      })
    );
    this.store.dispatch(setOrderFromCart({ orderFromCart: true }));
    this.router.navigate(['order/place-order']);
  }
}
