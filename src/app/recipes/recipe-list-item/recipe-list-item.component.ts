import { NgClass, NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RecipeListItem } from '../models/recipe-list-item.interface';

@Component({
  selector: 'app-recipe-list-item',
  standalone: true,
  imports: [NgForOf, NgIf, NgClass, MatListModule],
  templateUrl: './recipe-list-item.component.html',
  styleUrl: './recipe-list-item.component.scss',
})
export class RecipeListItemComponent {
  @Input({ required: true }) recipe!: RecipeListItem;
  @Output() recipeSelect = new EventEmitter<RecipeListItem>();

  selectRecipe() {
    this.recipeSelect.emit(this.recipe);
  }
}
