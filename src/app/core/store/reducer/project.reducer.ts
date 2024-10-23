import { createReducer, on } from '@ngrx/store';
import { fetchItemsSuccess, fetchItemByIdSuccess } from '../action/project.action';
export interface ItemState {
  items: any[];
  selectedItem: any | null;
}
export const initialState: ItemState = {
  items: [],
  selectedItem: null
};
export const itemReducer = createReducer(
  initialState,
  // Handle fetch items success
  on(fetchItemsSuccess, (state, { items }) => ({
    ...state,
    items: items
  })),
  // Handle fetch item by ID success
  on(fetchItemByIdSuccess, (state, { item }) => ({
    ...state,
    selectedItem: item
  }))
);