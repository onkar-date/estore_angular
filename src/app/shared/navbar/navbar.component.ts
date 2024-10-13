import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  constructor(private router: Router) {}

  gotToHome(): void {
    this.router.navigate(['/home/all-products']);
  }

  goToAddProduct(): void {
    this.router.navigate(['/home/add-product']);
  }
}
