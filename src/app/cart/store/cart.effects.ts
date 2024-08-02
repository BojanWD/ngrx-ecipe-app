import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import {
  selectAllIngredients,
  selectSelectedIngredientIds,
} from '../../ingredients/store/ingredients.selectors';
import * as CartActions from './cart.actions';

@Injectable()
export class CartEffects {
  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.selectRecipe),
      switchMap(({ recipe }) =>
        this.store.pipe(
          select(selectSelectedIngredientIds),
          switchMap((selectedIds) =>
            this.store.pipe(
              select(selectAllIngredients),
              map((ingredients) => {
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
  );

  constructor(
    private readonly store: Store,
    private readonly actions$: Actions
  ) {}
}
