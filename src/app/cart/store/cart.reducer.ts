import { createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../ingredients/models/ingredient.model';
import { addToCart, selectRecipe } from './cart.actions';

export interface CartState {
  cart: { recipeName: string; ingredients: Ingredient[] };
}

export const initialState: CartState = {
  cart: { recipeName: '', ingredients: [] },
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
  }))
);
