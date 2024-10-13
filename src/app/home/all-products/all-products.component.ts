import { Router } from '@angular/router';
import { Product } from '../../interface/Product.interface';
import { ProductService } from './../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss',
})
export class AllProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  showProductDetails(productId: number) {
    this.router.navigate([`home/product-details/${productId}`]);
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      console.log(this.products);
    });
  }
}
