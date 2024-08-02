import { CartState } from './cart/store/cart.reducer';
import { IngredientsState } from './ingredients/store/ingredients.reducer';
import { RecipesState } from './recipes/store/recipes.reducer';

export interface AppState {
  recipes: RecipesState;
  ingredients: IngredientsState;
  cart: CartState;
}
