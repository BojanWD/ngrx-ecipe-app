import { createAction, props } from '@ngrx/store';
import { IngredientData } from '../models/ingredient-data.interface';

export const loadIngredients = createAction('[Ingredients] Load Ingredients');
export const loadIngredientsSuccess = createAction(
  '[Ingredients] Load Ingredients Success',
  props<{ ingredients: IngredientData[] }>()
);
export const loadIngredientsFailure = createAction(
  '[Ingredients] Load Ingredients Failure',
  props<{ error: string }>()
);
