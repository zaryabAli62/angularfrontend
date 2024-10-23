import { createAction, props } from '@ngrx/store';
export const fetchItems = createAction('[Item List] Fetch Items');
export const fetchItemById = createAction(
  '[Item] Fetch Item By ID',
  props<{ id: string }>()
);
export const fetchItemsSuccess = createAction(
  '[Item API] Fetch Items Success',
  props<{ items: any[] }>()
);
export const fetchItemByIdSuccess = createAction(
  '[Item API] Fetch Item By ID Success',
  props<{ item: any }>()
);
export const fetchItemsFailure = createAction('[Item API] Fetch Items Failure');
export const fetchItemByIdFailure = createAction('[Item API] Fetch Item By ID Failure');