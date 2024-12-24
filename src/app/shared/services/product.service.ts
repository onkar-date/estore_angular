import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interface/Product.interface';
import { PaginatedResponse } from '../interface/paginatedResponse.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) {}

  getProducts(
    page: number,
    size: number,
    searchKey?: string
  ): Observable<PaginatedResponse<Product>> {
    const params: any = {
      page: page.toString(),
      size: size.toString(),
    };

    if (searchKey) {
      params['searchKey'] = searchKey;
    }

    // if (search) {
    //   params.search = search; // Add search if provided
    // }
    return this.httpClient.get<PaginatedResponse<Product>>(this.apiUrl, {
      params,
    });
  }

  getProductById(id: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(productData: FormData): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}`, productData);
  }
}
