import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { catchError, delay, filter, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  selectAllIngredients,
  selectSelectedIngredientIds,
} from '../../ingredients/store/ingredients.selectors';
import { AppState } from '../../app-state';
import { setLoading } from './cart.actions';
import { selectCartSelectedRecipe } from './cart.selector';
import * as CartActions from './cart.actions';

@Injectable()
export class CartEffects {
  private readonly checkoutFailPercentage = 0.1;
  private readonly checkoutErrorMessage = 'Checkout failed! Please try again';
  private readonly checkoutFakeDelay = 500;

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.selectRecipe),
      switchMap(({ recipe }) =>
        this.store.pipe(
          select(selectSelectedIngredientIds),
          switchMap((selectedIds) =>
            this.store.pipe(
              select(selectAllIngredients),
              switchMap((ingredients) =>
                this.store.pipe(
                  select(selectCartSelectedRecipe),
                  filter((selectedRecipe) => selectedRecipe !== null),
                  map(() => {
                    const unselectedIngredients = ingredients.filter(
                      (ingredient) =>
                        recipe.ingredientIds.includes(ingredient.id) &&
                        !selectedIds.includes(ingredient.id)
                    );
                    return CartActions.addToCart({
                      recipeName: recipe.name,
                      ingredients: unselectedIngredients,
                    });
                  })
                )
              )
            )
          )
        )
      )
    )
  );

  checkout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.checkout),
      tap(() => this.store.dispatch(setLoading({ loading: true }))),
      delay(this.checkoutFakeDelay),
      switchMap(() => {
        return of(null).pipe(
          switchMap(() => {
            if (Math.random() < this.checkoutFailPercentage) {
              throw new Error(this.checkoutErrorMessage);
            }
            return of(CartActions.checkoutSuccess());
          }),
          catchError((error) => of(CartActions.checkoutFailure({ error })))
        );
      }),
      tap(() => this.store.dispatch(setLoading({ loading: false })))
    )
  );

  constructor(
    private readonly store: Store<AppState>,
    private readonly actions$: Actions
  ) {}
}
