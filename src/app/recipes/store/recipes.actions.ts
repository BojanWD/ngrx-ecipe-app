import { createAction, props } from '@ngrx/store';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../../ingredients/models/ingredient.model';
import { RecipeListItem } from '../models/recipe-list-item';

export const loadRecipes = createAction('[Recipes] Load Recipes');
export const loadRecipesSuccess = createAction(
  '[Recipes] Load Recipes Success',
  props<{ recipes: Recipe[] }>()
);
export const loadRecipesFailure = createAction(
  '[Recipes] Load Recipes Failure',
  props<{ error: string }>()
);

export const selectRecipe = createAction(
  '[Recipe] Select Recipe',
  props<{ recipe: RecipeListItem }>()
);

export const addToCart = createAction(
  '[Recipe] Add To Cart',
  props<{ recipeName: string; ingredients: Ingredient[] }>()
);
