import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../ingredients/models/ingredient.model';
import {
  addToCart,
  checkout,
  checkoutFailure,
  checkoutSuccess,
  selectRecipe,
} from './cart.actions';
import { RecipeListItem } from '../../recipes/models/recipe-list-item.interface';

export interface CartState {
  cart: { recipeName: string; ingredients: Ingredient[] };
  loading: boolean;
  error: string | null;
  checkoutSuccess: boolean;
  selectedRecipe: RecipeListItem | null;
}

export const initialState: CartState = {
  cart: { recipeName: '', ingredients: [] },
  loading: false,
  error: null,
  checkoutSuccess: false,
  selectedRecipe: null,
};

export const cartReducer = createReducer(
  initialState,
  on(selectRecipe, (state, { recipe }) => ({
    ...state,
    selectedRecipe: recipe,
  })),
  on(addToCart, (state, { recipeName, ingredients }) => ({
    ...state,
    checkoutSuccess: false,
    error: null,
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
    selectedRecipe: null,
  })),
  on(checkoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    checkoutSuccess: false,
    error,
  }))
);
