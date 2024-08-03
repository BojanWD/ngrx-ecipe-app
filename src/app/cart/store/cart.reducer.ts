import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../ingredients/models/ingredient.model';
import {
  addToCart,
  checkout,
  checkoutFailure,
  checkoutSuccess,
  selectRecipe,
} from './cart.actions';

export interface CartState {
  cart: { recipeName: string; ingredients: Ingredient[] };
  loading: boolean;
  error: string | null;
  checkoutSuccess: boolean;
}

export const initialState: CartState = {
  cart: { recipeName: '', ingredients: [] },
  loading: false,
  error: null,
  checkoutSuccess: false,
};

export const cartReducer = createReducer(
  initialState,
  on(selectRecipe, (state, { recipe }) => ({
    ...state,
    checkoutSuccess: false,
    selectedRecipe: recipe,
  })),
  on(addToCart, (state, { recipeName, ingredients }) => ({
    ...state,
    cart: { recipeName, ingredients },
  })),
  on(checkout, (state) => ({
    ...state,
    loading: true,
    checkoutSuccess: false,
    error: null,
  })),
  on(checkoutSuccess, (state) => ({
    ...state,
    loading: false,
    checkoutSuccess: true,
    cart: { recipeName: '', ingredients: [] },
  })),
  on(checkoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    checkoutSuccess: false,
    error,
  }))
);
