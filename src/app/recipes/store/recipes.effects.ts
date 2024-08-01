import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../models/recipe.model';
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

  constructor(
    private readonly actions$: Actions,
    private readonly recipeService: RecipesService
  ) {}
}
