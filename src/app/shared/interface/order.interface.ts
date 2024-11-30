import { OrderItemStatus } from '../enums/orderItemStatus.enum';
import { OrderStatus } from '../enums/orderStatus.enum';

export interface Order {
  id: number;
  userId: number;
  items: Array<OrderItem>;
  orderDate: string;
  status: OrderStatus;
  totalAmount: number;
}

export interface OrderItem {
  name: string;
  description: string;
  quantity: number;
  price: number;
  base64Image: string;
  status: OrderItemStatus;
}

export interface OrderRequest {
  userId: number;
  items: OrderItemRequest[];
}

export interface OrderItemRequest {
  productId: number;
  quantity: number;
}
