import { createReducer, on } from '@ngrx/store';
import { Recipe } from '../models/recipe.model';
import {
  loadRecipes,
  loadRecipesSuccess,
  loadRecipesFailure,
} from './recipes.actions';

export interface RecipesState {
  recipes: Recipe[];
  error: string | null;
}

export const initialState: RecipesState = {
  recipes: [],
  error: null,
};

export const recipeReducer = createReducer(
  initialState,
  on(loadRecipes, (state) => ({ ...state, error: null })),
  on(loadRecipesSuccess, (state, { recipes }) => ({ ...state, recipes })),
  on(loadRecipesFailure, (state, { error }) => ({ ...state, error }))
);
