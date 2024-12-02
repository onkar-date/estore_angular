import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interface/User.interface';
import { UserType } from '../enums/UserType.enum';
import { SnackbarService } from '../services/snackbar.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectLoggedInUser } from '../../store/user/user.selectors';
import { logoutUser } from '../../store/user/user.actions';
import { selectCart } from '../../store/cart/cart.selectors';
import { CartState } from '../../store/cart/cart.reducer';
import { clearCart } from '../../store/cart/cart.actions';
import { initOrderState } from '../../store/order/order.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  loggedInUser$: Observable<User | null>;
  cartState$: Observable<CartState | null>;
  userType = UserType;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private snackbarService: SnackbarService
  ) {
    this.loggedInUser$ = store.select(selectLoggedInUser);
    this.cartState$ = this.store.select(selectCart);
  }

  ngOnInit(): void {}

  gotToHome(): void {
    this.router.navigate(['/home/all-products']);
  }

  goToAddProduct(): void {
    this.router.navigate(['/home/add-product']);
  }

  goToCustomerOrders(): void {
    this.router.navigate(['/order/my-orders']);
  }

  goToSellerOrders(): void {
    this.router.navigate(['/order/manage-orders']);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.store.dispatch(logoutUser());
    this.showSnackbar();
    this.store.dispatch(clearCart());
    this.store.dispatch(initOrderState());
    this.router.navigate(['/login']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  showSnackbar(): void {
    this.snackbarService.showSnackbar('Logged out succesfully!');
  }

  goToCart(): void {
    this.router.navigate(['/view-cart']);
  }
}
