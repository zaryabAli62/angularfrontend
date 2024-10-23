import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ItemState } from '../reducer/project.reducer';
// Create feature selector for item state
export const selectItemState = createFeatureSelector<ItemState>('itemState');
// Selector for all items
export const selectItems = createSelector(
  selectItemState,
  (state: ItemState) => state.items
);
// Selector for a single item (used in Add/Edit)
export const selectSelectedItem = createSelector(
  selectItemState,
  (state: ItemState) => state.selectedItem
);