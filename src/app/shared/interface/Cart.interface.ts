import { Product } from './Product.interface';

export interface Cart {
  items: CartItem[];
  totalAmount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}
