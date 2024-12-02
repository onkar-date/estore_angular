import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderRequest } from '../interface/order.interface';
import { Observable } from 'rxjs';
import { CustomerOrder, OrderItem } from '../../store/order/order.models';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private httpClient: HttpClient) {}

  placeOrder(order: OrderRequest): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}`, order);
  }

  fetchCustomerOrders(customerId: number): Observable<CustomerOrder[]> {
    return this.httpClient.get(
      `${this.apiUrl}/user-orders/${customerId}`
    ) as Observable<CustomerOrder[]>;
  }

  fetchSellerOrders(sellerId: number): Observable<OrderItem[]> {
    return this.httpClient.get(
      `${this.apiUrl}/seller-orders/${sellerId}`
    ) as Observable<OrderItem[]>;
  }
}
