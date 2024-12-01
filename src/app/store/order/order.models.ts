import { OrderItemStatus } from '../../shared/enums/orderItemStatus.enum';
import { OrderStatus } from '../../shared/enums/orderStatus.enum';
import { Product } from '../../shared/interface/Product.interface';

export interface OrderStateItem {
  product: Product;
  quantity: number;
  totalPrice: number;
}

export interface CustomerOrder {
  id: number;
  userId: number;
  items: Array<CustomerOrderItem>;
  orderDate: string;
  status: OrderStatus;
  totalAmount: number;
}

export interface CustomerOrderItem {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
  base64Image: string;
  status: OrderItemStatus;
}
