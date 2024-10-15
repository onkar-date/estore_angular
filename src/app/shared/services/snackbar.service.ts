import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private defaultSuccessMessage = 'Success!';
  private defaultServerErrorMessage = 'Something went wrong! Please try again';
  private defaultConfig: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  };
  constructor(private snackbar: MatSnackBar) {}

  showSnackbar(message: string, config = this.defaultConfig): void {
    this.snackbar.open(message, '', {
      ...this.defaultConfig,
      ...config,
    });
  }

  showSuccessSnackbarbar(
    message: string = this.defaultSuccessMessage,
    config = this.defaultConfig
  ): void {
    this.snackbar.open(message, '', {
      ...this.defaultConfig,
      ...config,
    });
  }

  showServerErrorSnackbarbar(
    message: string = this.defaultServerErrorMessage,
    config = this.defaultConfig
  ): void {
    this.snackbar.open(message, '', {
      ...this.defaultConfig,
      ...config,
    });
  }
}
