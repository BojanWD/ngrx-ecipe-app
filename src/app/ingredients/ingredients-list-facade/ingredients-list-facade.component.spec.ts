import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelectionListChange } from '@angular/material/list';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { IngredientsListFacadeComponent } from './ingredients-list-facade.component';
import { selectIngredients } from '../store/ingredients.actions';

describe('IngredientsListFacadeComponent', () => {
  let component: IngredientsListFacadeComponent;
  let fixture: ComponentFixture<IngredientsListFacadeComponent>;
  let store: MockStore;

  const initialState = {
    ingredients: [],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientsListFacadeComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientsListFacadeComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as MockStore;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch selectIngredients action with correct payload', () => {
    const mockEvent = {
      source: {
        selectedOptions: {
          selected: [{ value: 1 }, { value: 2 }, { value: 3 }],
        },
      },
    };
    const dispatchSpy = spyOn(store, 'dispatch');

    component.onIngredientSelect(mockEvent as MatSelectionListChange);

    expect(dispatchSpy).toHaveBeenCalledWith(
      selectIngredients({ ingredientIds: [1, 2, 3] })
    );
  });
});
