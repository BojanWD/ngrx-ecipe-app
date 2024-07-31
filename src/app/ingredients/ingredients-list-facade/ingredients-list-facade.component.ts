import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgForOf } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { select, Store } from '@ngrx/store';
import { loadIngredients } from '../store/ingredients.actions';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';
import { selectAllIngredients } from '../store/ingredients.selectors';

@Component({
  selector: 'app-ingredients-list-facade',
  standalone: true,
  imports: [NgForOf, AsyncPipe, MatListModule, MatIconModule],
  templateUrl: './ingredients-list-facade.component.html',
  styleUrl: './ingredients-list-facade.component.scss',
})
export class IngredientsListFacadeComponent implements OnInit {
  ingredients$: Observable<Ingredient[]> = this.store.pipe(
    select(selectAllIngredients)
  );

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(loadIngredients());
  }
}
