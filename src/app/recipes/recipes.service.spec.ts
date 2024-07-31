import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { RecipesService } from './recipes.service';
import { RecipeData } from './models/recipe-data.interface';
import { Recipe } from './models/recipe.model';

describe('RecipesService', () => {
  let service: RecipesService;
  let httpTesting: HttpTestingController;

  const mockRecipes: RecipeData[] = [
    {
      id: 0,
      name: 'Sarma',
      description: 'Cabbage rolls stuffed with minced meat',
      ingredientIds: [1, 2, 3, 4, 5, 6],
    },
    {
      id: 1,
      name: 'Ćevap',
      description: 'Small grilled minced meat sausages',
      ingredientIds: [2, 6, 7],
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecipesService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(RecipesService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all recipes', () => {
    service.getAllRecipes().subscribe((recipes: Recipe[]) => {
      expect(recipes.length).toBe(2);
      expect(recipes[0].name).toBe('Sarma');
      expect(recipes[1].name).toBe('Ćevap');
    });

    const req = httpTesting.expectOne('assets/recipes.json');
    expect(req.request.method).toBe('GET');
    req.flush({ recipes: mockRecipes });
    httpTesting.verify();
  });
});
