import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
  selectItemsToOrder,
  selectOrderFromCart,
  selectOrderTotal,
  selectPlaceOrderStatus,
} from '../../store/order/order.selectors';
import { OrderStateItem } from '../../store/order/order.models';
import { initPlaceOrder, placeOrder } from '../../store/order/order.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  OrderItem,
  OrderRequest,
} from '../../shared/interface/order.interface';
import { User } from '../../shared/interface/User.interface';
import { selectLoggedInUser } from '../../store/user/user.selectors';
import { ActionStatus } from '../../shared/enums/actionStatus.enum';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { Router } from '@angular/router';
import { clearCart } from '../../store/cart/cart.actions';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss',
})
export class PlaceOrderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  itemsToOrder: OrderStateItem[] = [];
  orderTotal$: Observable<number>;
  orderForm: FormGroup = new FormGroup({});
  user!: User | null;
  placedOrder!: OrderItem | null;
  orderingFromCart: boolean = false;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private router: Router
  ) {
    store
      .select(selectItemsToOrder)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.itemsToOrder = data));

    this.orderTotal$ = store.select(selectOrderTotal);

    store
      .select(selectLoggedInUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => (this.user = user));

    this.handlePlaceOrderResults();

    store
      .select(selectOrderFromCart)
      .pipe(takeUntil(this.destroy$))
      .subscribe((orderFromCart) => (this.orderingFromCart = orderFromCart));
  }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      name: ['Jon Doe', Validators.required],
      mobile: ['+91 9876543210', Validators.required],
      address: ['A-10, Casa Blanca, New Owell Road', Validators.required],
      city: ['Puerto Rico', Validators.required],
      state: ['Ohio', Validators.required],
      upi: ['test@123', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // Emit a value to signal completion
    this.destroy$.complete(); // Complete the destroy$ subject
    this.store.dispatch(initPlaceOrder());
  }

  handlePlaceOrderResults(): void {
    this.store
      .select(selectPlaceOrderStatus)
      .pipe(takeUntil(this.destroy$))
      .subscribe((status) => {
        if (status === ActionStatus.SUCCESS) {
          this.snackbarService.showSuccessSnackbarbar(
            'Order Placed Successfully !!'
          );
          if (this.orderingFromCart) {
            this.store.dispatch(clearCart());
          }
          this.router.navigate(['order/my-orders']);
        }
        if (status === ActionStatus.FAILURE) {
          this.snackbarService.showSuccessSnackbarbar(
            'Something went wrong !!'
          );
        }
      });
  }

  placeOrder(): void {
    if (this.user) {
      const order: OrderRequest = {
        userId: this.user?.id,
        items: this.itemsToOrder.map((item) => {
          return {
            productId: item.product.id,
            quantity: item.quantity,
          };
        }),
      };

      this.store.dispatch(placeOrder({ order }));
    }
  }
}
