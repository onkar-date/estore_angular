import { createReducer, on } from '@ngrx/store';
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from './cart.actions';
import { Product } from '../../shared/interface/Product.interface'; // Import the Product interface
import { CartItem } from '../../shared/interface/Cart.interface';

// Define the initial state of the cart
export interface CartState {
  items: CartItem[]; // List of items in the cart
  loading: boolean; // To track if cart is being loaded
  error: string | null; // Error message if something goes wrong
  total: number; // Total price of all items in the cart
}

export const initialState: CartState = {
  items: [],
  loading: false,
  error: null,
  total: 0, // Initially set total to 0
};

// Create the reducer using `createReducer`
export const cartReducer = createReducer(
  initialState,

  // Handling the action to load the cart
  on(getCart, (state) => ({
    ...state,
    loading: true, // Set loading to true when trying to load the cart
  })),

  // Handling action to add an item to the cart
  on(addItemToCart, (state, { product }) => {
    const itemExists = state.items.find(
      (cartItem) => cartItem.product.id === product.id
    );

    // Update total
    let updatedItems;
    let updatedTotal = state.total;

    if (itemExists) {
      // If the item already exists, we just increase its quantity and update total price
      updatedItems = state.items.map((cartItem) =>
        cartItem.product.id === product.id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              totalPrice: (cartItem.quantity + 1) * cartItem.product.price,
            }
          : cartItem
      );
      updatedTotal = updatedItems.reduce(
        (total, cartItem) => total + cartItem.totalPrice,
        0
      );
    } else {
      // If the item doesn't exist, add it to the cart with quantity 1
      updatedItems = [
        ...state.items,
        { product, quantity: 1, totalPrice: product.price },
      ];
      updatedTotal = updatedItems.reduce(
        (total, cartItem) => total + cartItem.totalPrice,
        0
      );
    }

    return {
      ...state,
      items: updatedItems,
      total: updatedTotal, // Update total
    };
  }),

  // Handling action to remove an item from the cart
  on(removeItemFromCart, (state, { itemId }) => {
    const updatedItems = state.items.filter(
      (item) => item.product.id !== itemId
    );
    const updatedTotal = updatedItems.reduce(
      (total, cartItem) => total + cartItem.totalPrice,
      0
    );
    return {
      ...state,
      items: updatedItems,
      total: updatedTotal, // Recalculate total
    };
  }),

  // Handling action to increase quantity of a cart item
  on(increaseQuantity, (state, { itemId }) => {
    const updatedItems = state.items.map((item) =>
      item.product.id === itemId
        ? {
            ...item,
            quantity: item.quantity + 1,
            totalPrice: (item.quantity + 1) * item.product.price,
          }
        : item
    );
    const updatedTotal = updatedItems.reduce(
      (total, cartItem) => total + cartItem.totalPrice,
      0
    );
    return {
      ...state,
      items: updatedItems,
      total: updatedTotal, // Recalculate total
    };
  }),

  // Handling action to decrease quantity of a cart item
  on(decreaseQuantity, (state, { itemId }) => {
    const updatedItems = state.items.map((item) =>
      item.product.id === itemId && item.quantity > 1
        ? {
            ...item,
            quantity: item.quantity - 1,
            totalPrice: (item.quantity - 1) * item.product.price,
          }
        : item
    );
    const updatedTotal = updatedItems.reduce(
      (total, cartItem) => total + cartItem.totalPrice,
      0
    );
    return {
      ...state,
      items: updatedItems,
      total: updatedTotal, // Recalculate total
    };
  }),

  // Handling action to clear the entire cart
  on(clearCart, (state) => ({
    ...state,
    items: [],
    total: 0, // Reset total to 0
  }))
);
