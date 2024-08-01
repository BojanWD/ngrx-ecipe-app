import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { IngredientData } from './models/ingredient-data.interface';
import { handleError } from '../shared/classes/error-handler';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  private readonly jsonURL = 'assets/ingredients.json';

  constructor(private readonly http: HttpClient) {}

  getAllIngredients(): Observable<{ ingredients: IngredientData[] }> {
    return this.http
      .get<{ ingredients: IngredientData[] }>(this.jsonURL)
      .pipe(catchError(handleError));
  }

  getSelectedIngredientIds(): number[] {
    try {
      const savedIngredients = localStorage.getItem('selectedIngredients');
      const selectedIngredientIds = savedIngredients
        ? JSON.parse(savedIngredients)
        : [];

      return selectedIngredientIds;
    } catch (error) {
      window.alert(error);
      return [];
    }
  }

  setSelectedIngredientIds(ingredientIds: number[]): void {
    try {
      localStorage.setItem(
        'selectedIngredients',
        JSON.stringify(ingredientIds)
      );
    } catch (error) {
      window.alert(error);
    }
  }
}
