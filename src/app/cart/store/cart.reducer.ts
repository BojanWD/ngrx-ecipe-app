import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../ingredients/models/ingredient.model';
import {
  addToCart,
  checkout,
  checkoutFailure,
  checkoutSuccess,
  clearCart,
  selectRecipe,
} from './cart.actions';

export interface CartState {
  cart: { recipeName: string; ingredients: Ingredient[] };
  loading: boolean;
  error: string | null;
}

export const initialState: CartState = {
  cart: { recipeName: '', ingredients: [] },
  loading: false,
  error: null,
};

export const cartReducer = createReducer(
  initialState,
  on(selectRecipe, (state, { recipe }) => ({
    ...state,
    selectedRecipe: recipe,
  })),
  on(addToCart, (state, { recipeName, ingredients }) => ({
    ...state,
    cart: { recipeName, ingredients },
  })),
  on(clearCart, (state) => ({
    ...state,
    cart: { recipeName: '', ingredients: [] },
  })),
  on(checkout, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(checkoutSuccess, (state) => ({
    ...state,
    loading: false,
    cart: { recipeName: '', ingredients: [] },
  })),
  on(checkoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
