import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'all-products',
        component: AllProductsComponent,
      },
      {
        path: 'add-product',
        component: AddProductComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
