import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { MaterialModule } from '../material/material.module';
import { AllProductsComponent } from './all-products/all-products.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, AllProductsComponent, AddProductComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class HomeModule {}
