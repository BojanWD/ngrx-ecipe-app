import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { IngredientsService } from '../ingredients.service';
import { Ingredient } from '../models/ingredient.model';
import * as IngredientActions from './ingredients.actions';
import {
  hydrateSelectedIngredients,
  loadIngredientsSuccess,
  selectIngredients,
} from './ingredients.actions';

@Injectable()
export class IngredientsEffects {
  loadIngredients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IngredientActions.loadIngredients),
      switchMap(() =>
        this.ingredientsService.getAllIngredients().pipe(
          map((responseData) =>
            IngredientActions.loadIngredientsSuccess({
              ingredients: responseData.ingredients.map(
                (ingredient) => new Ingredient(ingredient)
              ),
            })
          ),
          catchError((error) =>
            of(IngredientActions.loadIngredientsFailure({ error }))
          )
        )
      )
    )
  );

  hydrateSelectedIngredients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadIngredientsSuccess),
      delay(300),
      map(() => {
        const savedIngredients = localStorage.getItem('selectedIngredients');
        const selectedIngredientIds = savedIngredients
          ? JSON.parse(savedIngredients)
          : [];
        return hydrateSelectedIngredients({ selectedIngredientIds });
      })
    )
  );

  saveSelectedIngredients$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(selectIngredients),
        tap(({ ingredientIds }) => {
          localStorage.setItem(
            'selectedIngredients',
            JSON.stringify(ingredientIds)
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private readonly ingredientsService: IngredientsService
  ) {}
}
