import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IngredientsState } from './ingredients.reducer';

export const selectIngredientsState =
  createFeatureSelector<IngredientsState>('ingredients');

export const selectAllIngredients = createSelector(
  selectIngredientsState,
  (state) => state.ingredients
);

export const selectIngredientsError = createSelector(
  selectIngredientsState,
  (state) => state.error
);

export const selectSelectedIngredientIds = createSelector(
  selectIngredientsState,
  (state) => state.selectedIngredientIds
);
