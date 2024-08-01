import { createReducer, on } from '@ngrx/store';
import { Recipe } from '../models/recipe.model';
import {
  loadRecipes,
  loadRecipesSuccess,
  loadRecipesFailure,
  selectRecipe,
  addToCart,
} from './recipes.actions';
import { Ingredient } from '../../ingredients/models/ingredient.model';

export interface RecipesState {
  recipes: Recipe[];
  cart: { recipeName: string; ingredients: Ingredient[] };
  error: string | null;
}

export const initialState: RecipesState = {
  recipes: [],
  cart: { recipeName: '', ingredients: [] },
  error: null,
};

export const recipeReducer = createReducer(
  initialState,
  on(loadRecipes, (state) => ({ ...state, error: null })),
  on(loadRecipesSuccess, (state, { recipes }) => ({ ...state, recipes })),
  on(loadRecipesFailure, (state, { error }) => ({ ...state, error })),
  on(selectRecipe, (state, { recipe }) => ({
    ...state,
    selectedRecipe: recipe,
  })),
  on(addToCart, (state, { recipeName, ingredients }) => ({
    ...state,
    cart: { recipeName, ingredients },
  }))
);
