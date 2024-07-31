import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipeState } from './recipes.reducer';
import {
  selectAllIngredients,
  selectSelectedIngredientIds,
} from '../../ingredients/store/ingredients.selectors';
import { Recipe } from '../models/recipe.model';
import { RecipeListItem } from '../models/recipe-list-item';

export const selectRecipeState = createFeatureSelector<RecipeState>('recipes');

export const selectAllRecipes = createSelector(
  selectRecipeState,
  (state: RecipeState) => state.recipes
);

export const selectRecipeError = createSelector(
  selectRecipeState,
  (state: RecipeState) => state.error
);

export const selectRecipeListItems = createSelector(
  selectAllRecipes,
  selectAllIngredients,
  selectSelectedIngredientIds,
  (recipes, ingredients, selectedIngredientIds): RecipeListItem[] =>
    recipes.map((recipe: Recipe) => {
      const ingredientNames = recipe.ingredientIds.map(
        (id) =>
          ingredients.find((ingredient) => ingredient.id === id)?.name ||
          'Unknown Ingredient'
      );
      const isHighlighted = selectedIngredientIds.some((selectedId) =>
        recipe.ingredientIds.includes(selectedId)
      );

      return {
        ...recipe,
        ingredientNames,
        isHighlighted,
      };
    })
);
