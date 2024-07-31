import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipeState } from './recipes.reducer';

export const selectRecipeState = createFeatureSelector<RecipeState>('recipes');

export const selectAllRecipes = createSelector(
  selectRecipeState,
  (state: RecipeState) => state.recipes
);

export const selectRecipeError = createSelector(
  selectRecipeState,
  (state: RecipeState) => state.error
);
