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
  error: string | null;
}

export const initialState: CartState = {
  cart: { recipeName: '', ingredients: [] },
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
    error: null,
  })),
  on(checkoutSuccess, (state) => ({
    ...state,
    cart: { recipeName: '', ingredients: [] },
  })),
  on(checkoutFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
