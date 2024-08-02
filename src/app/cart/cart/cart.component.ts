import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../../ingredients/models/ingredient.model';
import {
  selectCart,
  selectCartCheckoutSuccess,
  selectCartError,
  selectCartLoading,
} from '../store/cart.selector';
import { checkout, clearCart } from '../store/cart.actions';
import { AppState } from '../../app-state';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    NgIf,
    MatIconModule,
    AsyncPipe,
    MatChipsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  cart$: Observable<{ recipeName: string; ingredients: Ingredient[] }> =
    this.store.select(selectCart);
  error$ = this.store.select(selectCartError);
  loading$ = this.store.select(selectCartLoading);
  checkoutSuccess$ = this.store.select(selectCartCheckoutSuccess);

  constructor(private readonly store: Store<AppState>) {}

  checkout(): void {
    this.store.dispatch(checkout());
  }

  clearCart(): void {
    this.store.dispatch(clearCart());
  }
}
