import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../models/ingredient.model';

export const loadIngredients = createAction('[Ingredients] Load Ingredients');
export const loadIngredientsSuccess = createAction(
  '[Ingredients] Load Ingredients Success',
  props<{ ingredients: Ingredient[] }>()
);
export const loadIngredientsFailure = createAction(
  '[Ingredients] Load Ingredients Failure',
  props<{ error: string }>()
);
export const selectIngredients = createAction(
  '[Ingredients] Select Ingredients',
  props<{ ingredientIds: number[] }>()
);

export const hydrateSelectedIngredients = createAction(
  '[Ingredients] Hydrate Selected Ingredients',
  props<{ selectedIngredientIds: number[] }>()
);
