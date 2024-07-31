import { IngredientData } from './ingredient-data.interface';

export class Ingredient {
  id: number;
  name: string;

  constructor(ingredientData: IngredientData) {
    this.id = ingredientData.id;
    this.name = ingredientData.name;
  }
}
