import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../shared/services/product.service';
import { User } from '../../shared/interface/User.interface';
import { AuthService } from '../../shared/services/auth.service';
import { UserType } from '../../shared/enums/UserType.enum';
import { SnackbarService } from '../../shared/services/snackbar.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup = new FormGroup({});
  imagePreview: string | null = null;
  loggedInUser: User | null = null;
  userType = UserType;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.loggedInUser = user;
      this.initForm();
    });
  }

  private initForm(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.maxLength(255)]],
      price: [null, [Validators.required, Validators.min(0)]],
      stockQuantity: [null, [Validators.required, Validators.min(0)]],
      image: [null, [Validators.required]],
      sellerId: [this.loggedInUser?.id, [Validators.required]],
    });
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.productForm.patchValue({ image: file });
      this.productForm.get('image')?.updateValueAndValidity();

      // Create image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = this.createProductFormData();

      this.productService.addProduct(formData).subscribe({
        next: (response) => {
          this.productForm.reset();
          this.imagePreview = null;
          this.showSnackBar();
        },
        error: (error) => {
          console.error('Error adding product', error);
        },
      });
    }
  }

  private createProductFormData(): FormData {
    const formData = new FormData();

    formData.append('name', this.productForm.get('name')?.value);
    formData.append('description', this.productForm.get('description')?.value);
    formData.append('price', this.productForm.get('price')?.value);
    formData.append(
      'stockQuantity',
      this.productForm.get('stockQuantity')?.value
    );
    formData.append('image', this.productForm.get('image')?.value);
    formData.append('sellerId', this.productForm.get('sellerId')?.value);

    return formData;
  }

  showSnackBar(): void {
    this.snackbarService.showSnackbar('Product added succesfully!', {
      duration: 4000,
    });
  }
}
