import { Product } from '../../shared/interface/Product.interface';

export interface OrderStateItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}
