import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { User } from '../../shared/interface/User.interface';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CustomerOrder } from '../../store/order/order.models';
import { selectLoggedInUser } from '../../store/user/user.selectors';
import { fetchCustomerOrders } from '../../store/order/order.actions';
import { selectCustomerOrders } from '../../store/order/order.selectors';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss',
})
export class MyOrdersComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  loggedInUser!: User;
  customerOrders$: Observable<CustomerOrder[]>;
  constructor(private store: Store<AppState>) {
    this.store
      .select(selectLoggedInUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (user) {
          this.loggedInUser = user;
          store.dispatch(fetchCustomerOrders({ customerId: user.id }));
        }
      });

    this.customerOrders$ = this.store.select(selectCustomerOrders);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
