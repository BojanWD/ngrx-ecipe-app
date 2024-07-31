import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { RecipesListFacadeComponent } from './recipes-list-facade.component';

describe('RecipesListFacadeComponent', () => {
  let component: RecipesListFacadeComponent;
  let fixture: ComponentFixture<RecipesListFacadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipesListFacadeComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(RecipesListFacadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
