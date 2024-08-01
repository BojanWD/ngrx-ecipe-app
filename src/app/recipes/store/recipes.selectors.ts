import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RecipesState } from './recipes.reducer';
import {
  selectAllIngredients,
  selectSelectedIngredientIds,
} from '../../ingredients/store/ingredients.selectors';
import { Recipe } from '../models/recipe.model';
import { RecipeListItem } from '../models/recipe-list-item';

export const selectRecipesState =
  createFeatureSelector<RecipesState>('recipes');

export const selectAllRecipes = createSelector(
  selectRecipesState,
  (state) => state.recipes
);

export const selectRecipesError = createSelector(
  selectRecipesState,
  (state) => state.error
);

export const selectRecipeListItems = createSelector(
  selectAllRecipes,
  selectAllIngredients,
  selectSelectedIngredientIds,
  (recipes, ingredients, selectedIngredientIds): RecipeListItem[] =>
    recipes.map((recipe: Recipe) => {
      const ingredientsList = recipe.ingredientIds.map((id) => {
        return {
          name:
            ingredients.find((ing) => ing.id === id)?.name ||
            'Unknown Ingredient',
          isHighlighted: selectedIngredientIds.includes(id),
        };
      });

      const isHighlighted = ingredientsList.some((ing) => ing.isHighlighted);
      const completed = recipe.ingredientIds.every((id) =>
        selectedIngredientIds.includes(id)
      );

      return {
        ...recipe,
        ingredientsList,
        isHighlighted,
        completed,
      };
    })
);
