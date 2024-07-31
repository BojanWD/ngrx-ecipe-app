import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { RecipesService } from '../recipes.service';
import * as RecipeActions from './recipes.actions';
import { Recipe } from '../models/recipe.model';

@Injectable()
export class RecipesEffects {
  loadRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.loadRecipes),
      mergeMap(() =>
        this.recipeService.getAllRecipes().pipe(
          map((responseData) =>
            RecipeActions.loadRecipesSuccess({
              recipes: responseData.recipes.map((recipe) => new Recipe(recipe)),
            })
          ),
          catchError((error) =>
            of(RecipeActions.loadRecipesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private recipeService: RecipesService
  ) {}
}
