import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { RecipesService } from './recipes.service';
import { RecipeData } from './models/recipe-data.interface';

describe('RecipesService', () => {
  let service: RecipesService;
  let httpTesting: HttpTestingController;

  const recipesUrl = 'assets/recipes.json';
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
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(RecipesService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all recipes', () => {
    service.getAllRecipes().subscribe((response: { recipes: RecipeData[] }) => {
      expect(response.recipes.length).toBe(2);
      expect(response.recipes[0].name).toBe('Sarma');
      expect(response.recipes[1].name).toBe('Ćevap');
    });

    const req = httpTesting.expectOne(recipesUrl);
    expect(req.request.method).toBe('GET');
    req.flush({ recipes: mockRecipes });
  });

  it('should handle error if recipes request fails', () => {
    const errorMessage =
      'There was an unexpected error! Please contact the IT support for more details.';

    service.getAllRecipes().subscribe({
      next: () => fail('expected an error, not recipes'),
      error: (error: string) => expect(error).toBe(errorMessage),
    });

    const req = httpTesting.expectOne(recipesUrl);
    expect(req.request.method).toBe('GET');
    req.flush('Something went wrong', {
      status: 500,
      statusText: 'Server Error',
    });
  });
});
