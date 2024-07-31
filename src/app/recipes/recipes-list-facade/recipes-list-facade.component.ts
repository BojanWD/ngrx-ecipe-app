import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe.model';
import { selectAllRecipes } from '../store/recipes.selectors';
import { loadRecipes } from '../store/recipes.actions';

@Component({
  selector: 'app-recipes-list-facade',
  standalone: true,
  imports: [NgForOf, AsyncPipe, MatListModule, MatIconModule],
  templateUrl: './recipes-list-facade.component.html',
  styleUrl: './recipes-list-facade.component.scss',
})
export class RecipesListFacadeComponent implements OnInit {
  recipes$: Observable<Recipe[]> = this.store.pipe(select(selectAllRecipes));

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadRecipes());
  }
}
