import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyOrdersComponent } from './my-orders/my-orders.component';

@NgModule({
  declarations: [PlaceOrderComponent, MyOrdersComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class OrderModule {}