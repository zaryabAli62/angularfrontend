import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { fetchItems, fetchItemsSuccess, fetchItemsFailure, fetchItemById, fetchItemByIdSuccess, fetchItemByIdFailure } from '../action/project.action';
import { ApiService } from '../../service/api.service';

@Injectable()
export class ItemEffects {
  constructor(private actions$: Actions, private itemService: ApiService) {}
  // Effect to fetch the list of items
  fetchItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchItems),
      mergeMap(() => this.itemService.get('projects').pipe(
        map(items => fetchItemsSuccess({ items })),
        catchError(() => of(fetchItemsFailure()))
      ))
    )
  );
  // Effect to fetch a specific item by ID
  fetchItemById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchItemById),
      mergeMap(action => this.itemService.get('projects/'+action.id).pipe(
        map(item => fetchItemByIdSuccess({ item })),
        catchError(() => of(fetchItemByIdFailure()))
      ))
    )
  );
}

















