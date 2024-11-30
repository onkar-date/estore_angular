import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../shared/interface/User.interface';
import { SnackbarService } from '../../shared/services/snackbar.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { loginUser } from '../../store/user/user.actions';
import { selectLoggedInUser } from '../../store/user/user.selectors';
import { clearCart } from '../../store/cart/cart.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  loggedInUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackbarService: SnackbarService,
    private store: Store<AppState>
  ) {
    store.select(selectLoggedInUser).subscribe((user) => {
      if (user) {
        store.dispatch(clearCart());
        this.showSnackbar();
        this.router.navigate(['/home/all-products']);
      }
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      username: ['customer1', [Validators.required]],
      password: ['pass123', [Validators.required]],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.store.dispatch(loginUser({ username, password }));
    }
  }

  showSnackbar(): void {
    this.snackbarService.showSnackbar('Logged In!');
  }
}
