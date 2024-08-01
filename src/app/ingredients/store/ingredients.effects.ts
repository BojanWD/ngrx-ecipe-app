import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { IngredientsService } from '../ingredients.service';
import { Ingredient } from '../models/ingredient.model';
import * as IngredientActions from './ingredients.actions';

@Injectable()
export class IngredientsEffects {
  loadIngredients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(IngredientActions.loadIngredients),
      mergeMap(() =>
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

  constructor(
    private actions$: Actions,
    private ingredientsService: IngredientsService
  ) {}
}
