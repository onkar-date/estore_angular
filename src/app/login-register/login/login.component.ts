import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/interface/User.interface';

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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = this.fb.group({
      username: ['rambo', [Validators.required]],
      password: ['password123', [Validators.required]],
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      this.authService
        .login(
          this.loginForm.get('username')?.value,
          this.loginForm.get('password')?.value
        )
        .subscribe((loggedInUser) => {
          this.loggedInUser = loggedInUser;
          this.router.navigate(['/home/all-products']);
        });
    }
  }
}
