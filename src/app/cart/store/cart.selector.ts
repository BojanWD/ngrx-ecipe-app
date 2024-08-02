import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCart = createSelector(
  selectCartState,
  (state) => state.cart
);

export const selectCartError = createSelector(
  selectCartState,
  (state) => state.error
);
