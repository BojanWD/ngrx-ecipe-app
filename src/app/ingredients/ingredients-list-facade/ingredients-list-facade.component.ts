import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  loadIngredients,
  selectIngredients,
} from '../store/ingredients.actions';
import { Ingredient } from '../models/ingredient.model';
import {
  selectAllIngredients,
  selectIngredientsError,
  selectIngredientsLoading,
  selectSelectedIngredientIds,
} from '../store/ingredients.selectors';
import { AppState } from '../../app-state';

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
    MatProgressSpinnerModule,
  ],
  templateUrl: './ingredients-list-facade.component.html',
  styleUrl: './ingredients-list-facade.component.scss',
})
export class IngredientsListFacadeComponent implements OnInit {
  ingredients$: Observable<Ingredient[]> =
    this.store.select(selectAllIngredients);
  selectedIngredientIds$: Observable<number[]> = this.store.select(
    selectSelectedIngredientIds
  );
  error$: Observable<string | null> = this.store.select(selectIngredientsError);
  loading$: Observable<boolean> = this.store.select(selectIngredientsLoading);

  constructor(private readonly store: Store<AppState>) {}

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
