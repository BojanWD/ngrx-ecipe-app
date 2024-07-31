import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { IngredientsService } from './ingredients.service';

describe('IngredientsService', () => {
  let service: IngredientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(IngredientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
