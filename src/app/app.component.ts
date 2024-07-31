import { Component } from '@angular/core';
import { RecipesListFacadeComponent } from './recipes/recipes-list-facade/recipes-list-facade.component';
import { IngredientsListFacadeComponent } from './ingredients/ingredients-list-facade/ingredients-list-facade.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecipesListFacadeComponent, IngredientsListFacadeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
