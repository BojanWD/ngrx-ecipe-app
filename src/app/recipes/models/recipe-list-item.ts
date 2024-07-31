import { Recipe } from './recipe.model';

export interface RecipeListItem extends Recipe {
  ingredientsList: { name: string; isHighlighted: boolean }[];
  isHighlighted: boolean;
}
