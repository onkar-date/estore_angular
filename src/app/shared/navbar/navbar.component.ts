import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interface/User.interface';
import { AuthService } from '../services/auth.service';
import { UserType } from '../enums/UserType.enum';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  gotToHome(): void {
    this.router.navigate(['/home/all-products']);
  }

  goToAddProduct(): void {
    this.router.navigate(['/home/add-product']);
  }

  isSeller(): boolean {
    if (this.currentUser) {
      return this.currentUser.role === UserType.SELLER;
    }
    return false;
  }

  logout(): void {
    this.authService.logout();
    this.showSnackbar();
    this.router.navigate(['/login']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  showSnackbar(): void {
    this.snackbarService.showSnackbar('Logged out succesfully!');
  }
}
