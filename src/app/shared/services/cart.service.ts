import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../interface/Cart.interface';
import { Product } from '../interface/Product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartSubject: BehaviorSubject<Cart>;
  public cart$: Observable<Cart>;

  constructor() {
    const cartData = localStorage.getItem('cart');
    const cart = cartData
      ? JSON.parse(cartData)
      : { items: [], totalAmount: 0 };

    this.cartSubject = new BehaviorSubject<Cart>(cart);
    this.cart$ = this.cartSubject.asObservable();
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this.getCart();
    const existingCartItem = currentCart.items.find(
      (item) => item.product.id === product.id
    );

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      existingCartItem.totalPrice =
        existingCartItem.quantity * existingCartItem.product.price;
    } else {
      const newCartItem: CartItem = {
        product,
        quantity,
        totalPrice: product.price * quantity,
      };
      currentCart.items.push(newCartItem);
    }

    currentCart.totalAmount = this.calculateCartTotal(currentCart);
    this.cartSubject.next(currentCart);
    this.saveCartToLocalStorage(currentCart);
  }

  decreaseQuantity(productId: number): void {
    const item = this.getCartItem(productId);
    if (!item) {
      console.error(`Product with id ${productId} is not added to cart`);
      return;
    }
    item.quantity--;
    item.totalPrice = item.quantity * item.product.price;
    this.publishUpdatedCart(this.getCart());
  }

  increaseQuantity(productId: number): void {
    const item = this.getCartItem(productId);
    if (!item) {
      console.error(`Product with id ${productId} is not added to cart`);
      return;
    }
    item.quantity++;
    item.totalPrice = item.quantity * item.product.price;
    console.log(this.getCart());

    this.publishUpdatedCart(this.getCart());
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  clearCart(): void {
    const emptyCart: Cart = { items: [], totalAmount: 0 };
    this.cartSubject.next(emptyCart);
    localStorage.removeItem('cart');
  }

  removeItemFromCart(productId: number): void {
    const currentCart = this.getCart();
    const updatedCart = {
      ...currentCart,
      items: currentCart.items.filter((item) => item.product.id !== productId),
    };
    this.publishUpdatedCart(updatedCart);
  }

  private getCartItem(productId: number): CartItem | null {
    return (
      this.getCart().items.find((item) => item.product.id === productId) ?? null
    );
  }

  private publishUpdatedCart(updatedCart: Cart): void {
    updatedCart.totalAmount = this.calculateCartTotal(updatedCart);
    this.cartSubject.next(updatedCart);
    this.saveCartToLocalStorage(updatedCart);
  }

  private calculateCartTotal(cart: Cart): number {
    return cart.items.reduce((acc, item) => acc + item.totalPrice, 0);
  }

  private saveCartToLocalStorage(cart: Cart): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
