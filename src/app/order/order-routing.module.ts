import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';

const routes: Routes = [
  {
    path: 'order/place-order',
    component: PlaceOrderComponent,
  },
  {
    path: 'order/my-orders',
    component: MyOrdersComponent,
  },
  {
    path: 'order/manage-orders',
    component: ManageOrdersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
