import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, delay, map, switchMap, tap } from 'rxjs/operators';
import { IngredientsService } from '../ingredients.service';
import { Ingredient } from '../models/ingredient.model';
import * as IngredientActions from './ingredients.actions';
import { IngredientsState } from './ingredients.reducer';

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
      ofType(IngredientActions.loadIngredientsSuccess),
      tap(() =>
        this.store.dispatch(IngredientActions.setLoading({ loading: true }))
      ),
      delay(300),
      map(() =>
        IngredientActions.hydrateSelectedIngredients({
          selectedIngredientIds:
            this.ingredientsService.getSelectedIngredientIds(),
        })
      ),
      tap(() =>
        this.store.dispatch(IngredientActions.setLoading({ loading: false }))
      )
    )
  );

  saveSelectedIngredients$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(IngredientActions.selectIngredients),
        tap(({ ingredientIds }) =>
          this.ingredientsService.setSelectedIngredientIds(ingredientIds)
        )
      ),
    { dispatch: false }
  );

  constructor(
    private readonly store: Store<IngredientsState>,
    private readonly actions$: Actions,
    private readonly ingredientsService: IngredientsService
  ) {}
}
