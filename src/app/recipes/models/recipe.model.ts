import { RecipeData } from './recipe-data.interface';

export class Recipe {
  id: number;
  name: string;
  description: string;
  ingredientIds: number[];

  constructor(recipeData: RecipeData) {
    this.id = recipeData.id;
    this.name = recipeData.name;
    this.description = recipeData.description;
    this.ingredientIds = recipeData.ingredientIds;
  }
}
