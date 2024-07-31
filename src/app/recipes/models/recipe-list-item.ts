import { Recipe } from './recipe.model';

export interface RecipeListItem extends Recipe {
  ingredientNames: string[];
  isHighlighted: boolean;
}
