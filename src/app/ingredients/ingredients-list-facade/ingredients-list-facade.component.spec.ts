import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { IngredientsListFacadeComponent } from './ingredients-list-facade.component';

describe('IngredientsListFacadeComponent', () => {
  let component: IngredientsListFacadeComponent;
  let fixture: ComponentFixture<IngredientsListFacadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngredientsListFacadeComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(IngredientsListFacadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
