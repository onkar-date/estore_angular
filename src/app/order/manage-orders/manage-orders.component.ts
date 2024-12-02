import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { User } from '../../shared/interface/User.interface';
import { AppState } from '../../store/app.state';
import { fetchCustomerOrders, fetchSellerOrders } from '../../store/order/order.actions';
import { CustomerOrder, OrderItem } from '../../store/order/order.models';
import { selectCustomerOrders, selectSellerOrders } from '../../store/order/order.selectors';
import { selectLoggedInUser } from '../../store/user/user.selectors';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.scss'
})
export class ManageOrdersComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  loggedInUser!: User;
  sellerOrders$: Observable<OrderItem[]>;
  constructor(private store: Store<AppState>) {
    this.store
      .select(selectLoggedInUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) {
          this.loggedInUser = user;
          store.dispatch(fetchSellerOrders({ sellerId: user.id }));
        }
      });

    this.sellerOrders$ = this.store.select(selectSellerOrders);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
