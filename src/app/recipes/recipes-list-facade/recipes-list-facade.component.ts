import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  selectRecipeListItems,
  selectRecipesError,
} from '../store/recipes.selectors';
import { loadRecipes } from '../store/recipes.actions';
import { RecipeListItem } from '../models/recipe-list-item';
import { RecipeListItemComponent } from '../recipe-list-item/recipe-list-item.component';
import { RecipesState } from '../store/recipes.reducer';
import { selectRecipe } from '../../cart/store/cart.actions';

@Component({
  selector: 'app-recipes-list-facade',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe,
    RecipeListItemComponent,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './recipes-list-facade.component.html',
  styleUrl: './recipes-list-facade.component.scss',
})
export class RecipesListFacadeComponent implements OnInit {
  recipes$: Observable<RecipeListItem[]> = this.store.select(
    selectRecipeListItems
  );
  error$: Observable<string | null> = this.store.select(selectRecipesError);

  constructor(private readonly store: Store<RecipesState>) {}

  ngOnInit(): void {
    this.store.dispatch(loadRecipes());
  }

  onRecipeClick(recipe: RecipeListItem): void {
    this.store.dispatch(selectRecipe({ recipe }));
  }
}
