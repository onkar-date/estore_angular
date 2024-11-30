import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderRequest } from '../interface/order.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private httpClient: HttpClient) {}

  placeOrder(order: OrderRequest): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}`, order);
  }
}
