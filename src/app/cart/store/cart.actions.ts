import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../../ingredients/models/ingredient.model';
import { RecipeListItem } from '../../recipes/models/recipe-list-item';

export const selectRecipe = createAction(
  '[Cart] Select Recipe',
  props<{ recipe: RecipeListItem }>()
);

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ recipeName: string; ingredients: Ingredient[] }>()
);

export const clearCart = createAction('[Cart] Clear Cart');
