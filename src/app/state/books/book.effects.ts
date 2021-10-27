import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookPageActions, BookApiActions } from './actions';
import { DataService } from 'src/app/services/data.service';
import { Store } from '@ngrx/store';
import { State } from '../app.state';
import { getCurrentAuthorId } from '../authors/author.selectors';
import { AuthorPageActions } from '../authors/actions';

@Injectable()
export class BookEffects {

  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<State>
  ) { }

  loadBooks$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(BookPageActions.loadBooks),
        mergeMap(({ currentAuthorId }) =>
          this.dataService.getBooks(currentAuthorId).pipe(
            map(books =>
              BookApiActions.loadBooksSuccess({ books })),
            catchError(error =>
              of(BookApiActions.loadBooksFailure({ error })))
          )
        )
      );
  });
  /*
    updateProduct$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(ProductPageActions.updateProduct),
          concatMap(action =>
            this.productService.updateProduct(action.product)
              .pipe(
                map(product => ProductApiActions.updateProductSuccess({ product })),
                catchError(error => of(ProductApiActions.updateProductFailure({ error })))
              )
          )
        );
    });
  
    createProduct$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(ProductPageActions.createProduct),
          concatMap(action =>
            this.productService.createProduct(action.product)
              .pipe(
                map(product => ProductApiActions.createProductSuccess({ product })),
                catchError(error => of(ProductApiActions.createProductFailure({ error })))
              )
          )
        );
    });
  
    deleteProduct$ = createEffect(() => {
      return this.actions$
        .pipe(
          ofType(ProductPageActions.deleteProduct),
          mergeMap(action =>
            this.productService.deleteProduct(action.productId).pipe(
              map(() => ProductApiActions.deleteProductSuccess({ productId: action.productId })),
              catchError(error => of(ProductApiActions.deleteProductFailure({ error })))
            )
          )
        );
    });
    */
}
