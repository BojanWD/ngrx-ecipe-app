import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../models/recipe.model';
import {
  selectAllIngredients,
  selectSelectedIngredientIds,
} from '../../ingredients/store/ingredients.selectors';
import * as RecipeActions from './recipes.actions';

@Injectable()
export class RecipesEffects {
  loadRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.loadRecipes),
      switchMap(() =>
        this.recipeService.getAllRecipes().pipe(
          map((responseData) =>
            RecipeActions.loadRecipesSuccess({
              recipes: responseData.recipes.map((recipe) => new Recipe(recipe)),
            })
          ),
          catchError((error) => {
            return of(RecipeActions.loadRecipesFailure({ error }));
          })
        )
      )
    )
  );

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.selectRecipe),
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
                return RecipeActions.addToCart({
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
    private readonly actions$: Actions,
    private readonly recipeService: RecipesService
  ) {}
}
