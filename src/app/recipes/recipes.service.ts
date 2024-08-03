import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { RecipeData } from './models/recipe-data.interface';
import { handleError } from '../shared/error-handler';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private readonly jsonURL = 'assets/recipes.json';

  constructor(private readonly http: HttpClient) {}

  getAllRecipes(): Observable<{ recipes: RecipeData[] }> {
    return this.http
      .get<{ recipes: RecipeData[] }>(this.jsonURL)
      .pipe(catchError(handleError));
  }
}
