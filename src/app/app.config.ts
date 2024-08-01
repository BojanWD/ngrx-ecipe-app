import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { RecipesEffects } from './recipes/store/recipes.effects';
import { recipeReducer } from './recipes/store/recipes.reducer';
import { IngredientsEffects } from './ingredients/store/ingredients.effects';
import { ingredientReducer } from './ingredients/store/ingredients.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([]),
    provideAnimationsAsync(),
    provideHttpClient(),
    provideStore({
      recipes: recipeReducer,
      ingredients: ingredientReducer,
    }),
    provideEffects(RecipesEffects, IngredientsEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
