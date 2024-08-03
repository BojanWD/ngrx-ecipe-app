import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../../ingredients/models/ingredient.model';
import { RecipeListItem } from '../../recipes/models/recipe-list-item.interface';

export const selectRecipe = createAction(
  '[Cart] Select Recipe',
  props<{ recipe: RecipeListItem }>()
);

export const addToCart = createAction(
  '[Cart] Add To Cart',
  props<{ recipeName: string; ingredients: Ingredient[] }>()
);

export const checkout = createAction('[Cart] Checkout');
export const checkoutSuccess = createAction('[Cart] Checkout Success');
export const checkoutFailure = createAction(
  '[Cart] Checkout Failure',
  props<{ error: string }>()
);
export const setLoading = createAction(
  '[Cart] Set Loading',
  props<{ loading: boolean }>()
);
