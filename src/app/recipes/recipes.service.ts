import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Recipe } from './models/recipe.model';
import { RecipeData } from './models/recipe-data.interface';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private readonly jsonURL = 'assets/recipes.json';
  private readonly http = inject(HttpClient);

  getAllRecipes(): Observable<Recipe[]> {
    return this.http
      .get<{ recipes: RecipeData[] }>(this.jsonURL)
      .pipe(
        map((response) =>
          response.recipes.map((recipeData) => new Recipe(recipeData))
        )
      );
  }
}
