import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgClass, NgForOf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectRecipeListItems } from '../store/recipes.selectors';
import { loadRecipes } from '../store/recipes.actions';
import { RecipeListItem } from '../models/recipe-list-item';

@Component({
  selector: 'app-recipes-list-facade',
  standalone: true,
  imports: [NgForOf, NgClass, AsyncPipe, MatListModule, MatIconModule],
  templateUrl: './recipes-list-facade.component.html',
  styleUrl: './recipes-list-facade.component.scss',
})
export class RecipesListFacadeComponent implements OnInit {
  recipes$: Observable<RecipeListItem[]> = this.store.pipe(
    select(selectRecipeListItems)
  );

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadRecipes());
  }
}
