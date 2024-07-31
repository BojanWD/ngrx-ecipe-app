import { createReducer, on } from '@ngrx/store';
import {
  loadIngredients,
  loadIngredientsSuccess,
  loadIngredientsFailure,
} from './ingredients.actions';
import { IngredientData } from '../models/ingredient-data.interface';

export interface IngredientState {
  ingredients: IngredientData[];
  error: string | null;
}

export const initialState: IngredientState = {
  ingredients: [],
  error: null,
};

export const ingredientReducer = createReducer(
  initialState,
  on(loadIngredients, (state) => ({ ...state, error: null })),
  on(loadIngredientsSuccess, (state, { ingredients }) => ({
    ...state,
    ingredients,
  })),
  on(loadIngredientsFailure, (state, { error }) => ({ ...state, error }))
);
