import { createReducer, on } from '@ngrx/store';
import {
  loadIngredients,
  loadIngredientsSuccess,
  loadIngredientsFailure,
  selectIngredients,
} from './ingredients.actions';
import { Ingredient } from '../models/ingredient.model';

export interface IngredientState {
  ingredients: Ingredient[];
  selectedIngredientIds: number[];
  error: string | null;
}

export const initialState: IngredientState = {
  ingredients: [],
  selectedIngredientIds: [],
  error: null,
};

export const ingredientReducer = createReducer(
  initialState,
  on(loadIngredients, (state) => ({ ...state, error: null })),
  on(loadIngredientsSuccess, (state, { ingredients }) => ({
    ...state,
    ingredients,
  })),
  on(loadIngredientsFailure, (state, { error }) => ({ ...state, error })),
  on(selectIngredients, (state, { ingredientIds }) => ({
    ...state,
    selectedIngredientIds: ingredientIds,
  }))
);
