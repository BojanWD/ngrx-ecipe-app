import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IngredientState } from './ingredients.reducer';

export const selectIngredientState =
  createFeatureSelector<IngredientState>('ingredients');

export const selectAllIngredients = createSelector(
  selectIngredientState,
  (state: IngredientState) => state.ingredients
);

export const selectIngredientError = createSelector(
  selectIngredientState,
  (state: IngredientState) => state.error
);
