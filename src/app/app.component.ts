import { Component } from '@angular/core';
import { RecipesListFacadeComponent } from './recipes/recipes-list-facade/recipes-list-facade.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RecipesListFacadeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
