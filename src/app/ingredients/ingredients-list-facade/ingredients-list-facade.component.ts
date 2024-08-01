import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  loadIngredients,
  selectIngredients,
} from '../store/ingredients.actions';
import { Ingredient } from '../models/ingredient.model';
import {
  selectAllIngredients,
  selectIngredientsError,
  selectSelectedIngredientIds,
} from '../store/ingredients.selectors';

@Component({
  selector: 'app-ingredients-list-facade',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    AsyncPipe,
    MatListModule,
    MatIconModule,
  ],
  templateUrl: './ingredients-list-facade.component.html',
  styleUrl: './ingredients-list-facade.component.scss',
})
export class IngredientsListFacadeComponent implements OnInit {
  ingredients$: Observable<Ingredient[]> = this.store.pipe(
    select(selectAllIngredients)
  );
  selectedIngredientIds$: Observable<number[]> = this.store.pipe(
    select(selectSelectedIngredientIds)
  );
  error$: Observable<string | null> = this.store.pipe(
    select(selectIngredientsError)
  );

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadIngredients());
  }

  onIngredientSelect(event: MatSelectionListChange): void {
    const selectedOptions = event.source.selectedOptions.selected;
    const selectedIngredientIds = selectedOptions.map((option) => option.value);
    this.store.dispatch(
      selectIngredients({ ingredientIds: selectedIngredientIds })
    );
  }
}
