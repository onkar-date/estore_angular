import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from '../../shared/interface/Cart.interface';
import { CartService } from '../../shared/services/cart.service';
import { Product } from '../../shared/interface/Product.interface';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrl: './view-cart.component.scss',
})
export class ViewCartComponent implements OnInit {
  cart: Cart | null = null;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((cartData) => {
      this.cart = cartData;
      console.log(this.cart);
    });
  }

  getTotalPrice(item: CartItem): number {
    return item.product.price * item.quantity;
  }

  decreaseQuantity(productId: number): void {
    if (this.isMinimumQuantityReached(productId)) {
      return;
    }
    this.cartService.decreaseQuantity(productId);
  }

  increaseQuantity(productId: number): void {
    this.cartService.increaseQuantity(productId);
  }

  isMinimumQuantityReached(productId: number): boolean {
    return (
      this.cart?.items.find((item) => item.product.id === productId)
        ?.quantity === 1
    );
  }

  removeFromCart(productId: number): void {
    this.cartService.removeItemFromCart(productId);
  }
}
