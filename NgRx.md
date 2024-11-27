### **Complete Setup for NgRx in Angular App with Multiple States**

---

### **1. Install NgRx**

Start by installing the necessary NgRx packages:

```bash
ng add @ngrx/store
ng add @ngrx/effects
ng add @ngrx/entity
```

These packages allow you to manage state with `Store`, handle side effects with `Effects`, and manage entity collections with `Entity` (optional).

---

### **2. App Module Setup**

In your `AppModule`, you need to set up the root store configuration and import the feature reducers globally via `StoreModule.forRoot()`. This will ensure that the `Store` is available for all feature modules.

#### **App Module (`app.module.ts`)**

Here, we import `StoreModule` with the global reducers from `app.state.ts` and also set up `EffectsModule` globally. We don’t need to import the `Store` in the `ProductModule` or other feature modules anymore.

```typescript
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AppComponent } from "./app.component";
import { ProductModule } from "./product/product.module"; // Feature module
import { OrderModule } from "./order/order.module"; // Feature module
import { appReducers } from "./store/app.state"; // Import global reducers

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ProductModule, // Feature module for products
    OrderModule, // Feature module for orders
    StoreModule.forRoot(appReducers), // Global reducer setup (includes product, order, etc.)
    EffectsModule.forRoot([ProductEffects]), // Global effects setup
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

### **3. Centralizing Reducers in `app.state.ts`**

For better maintainability and scalability, it's a good practice to keep all the reducers centralized in a single file like `app.state.ts`. This file exports a combined reducer object that can be imported into `AppModule`.

#### **App State (`app.state.ts`)**

Here, we define the combined reducers from different feature modules (e.g., `product`, `order`, `cart`, etc.).

```typescript
import { ActionReducerMap } from "@ngrx/store";
import { ProductState } from "./product/store/product.reducer"; // Import feature state
import { OrderState } from "./order/store/order.reducer"; // Import feature state
import { CartState } from "./cart/store/cart.reducer"; // Import feature state
import { UserState } from "./user/store/user.reducer"; // Import feature state

// Define the global state interface
export interface AppState {
  product: ProductState;
  order: OrderState;
  cart: CartState;
  user: UserState;
}

// Combine all reducers in the root state
export const appReducers: ActionReducerMap<AppState> = {
  product: productReducer,
  order: orderReducer,
  cart: cartReducer,
  user: userReducer,
};
```

---

### **5. Defining the Reducer for Product State (`product.reducer.ts`)**

The reducer will manage the `ProductState` and handle actions like loading products, success, and failure.

#### **Product Reducer (`product.reducer.ts`)**

```typescript
import { createReducer, on } from "@ngrx/store";
import { loadProducts, loadProductsSuccess, loadProductsFailure } from "./product.actions";
import { Product } from "../../shared/models/product.model"; // Import your product model

export interface ProductState {
  products: Product[];
  error: string | null;
  loading: boolean;
}

export const initialState: ProductState = {
  products: [],
  error: null,
  loading: false,
};

export const productReducer = createReducer(
  initialState,
  on(loadProducts, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products,
  })),
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
```

---

### **6. Product Actions (`product.actions.ts`)**

Define actions to trigger state changes, such as loading products, handling success, and managing errors.

```typescript
import { createAction, props } from "@ngrx/store";
import { Product } from "../../shared/models/product.model";

export const loadProducts = createAction("[Product] Load Products");
export const loadProductsSuccess = createAction("[Product] Load Products Success", props<{ products: Product[] }>());
export const loadProductsFailure = createAction("[Product] Load Products Failure", props<{ error: string }>());
```

---

### **7. Product Effects (`product.effects.ts`)**

Define side effects like API calls using `ngrx/effects`. Here, you fetch products when the `loadProducts` action is dispatched.

#### **Product Effects (`product.effects.ts`)**

```typescript
import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { ProductService } from "../../shared/services/product.service"; // Your product service
import { loadProducts, loadProductsSuccess, loadProductsFailure } from "./product.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { inject } from "@angular/core"; // For using inject method

@Injectable()
export class ProductEffects {
  actions$ = inject(Actions); // Use inject to get actions$
  productService = inject(ProductService); // Inject the product service using inject()

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => loadProductsSuccess({ products })),
          catchError((error) => of(loadProductsFailure({ error: error.message })))
        )
      )
    )
  );
}
```

---

### **8. Dispatching Actions from Components**

In your component, dispatch actions and use the `Store` to select the state.

#### **Product Component (`product.component.ts`)**

```typescript
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { loadProducts } from "./store/product.actions"; // Action to load products
import { Observable } from "rxjs";
import { Product } from "../../shared/models/product.model";
import { selectAllProducts } from "./store/product.selectors"; // Import selectors

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"],
})
export class ProductComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Dispatching the loadProducts action to fetch data
    this.store.dispatch(loadProducts());

    // Selecting the state from the store using a selector
    this.products$ = this.store.select(selectAllProducts);
  }
}
```

---

### **9. Folder Structure**

Here’s an organized folder structure to follow for large applications:

```plaintext
src/
|-- app/
    |-- store/
        |-- app.state.ts            // Contains the global reducers
        |-- product/
            |-- product.actions.ts
            |-- product.reducer.ts
            |-- product.effects.ts
            |-- product.selectors.ts
        |-- order/
            |-- order.actions.ts
            |-- order.reducer.ts
            |-- order.effects.ts
            |-- order.selectors.ts
        |-- cart/
            |-- cart.actions.ts
            |-- cart.reducer.ts
            |-- cart.effects.ts
            |-- cart.selectors.ts
        |-- user/
            |-- user.actions.ts
            |-- user.reducer.ts
            |-- user.effects.ts
            |-- user.selectors.ts
    |-- product/
        |-- product.module.ts
        |-- product.component.ts
    |-- order/
        |-- order.module.ts
        |-- order.component.ts
    |-- cart/
        |-- cart.module.ts
        |-- cart.component.ts
    |-- user/
        |-- user
```
