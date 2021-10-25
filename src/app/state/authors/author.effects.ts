import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthorPageActions, AuthorApiActions } from './actions';
import { DataService } from 'src/app/services/data.service';

@Injectable()
export class AuthorEffects {

  constructor(private actions$: Actions, private dataService: DataService) { }

  loadAuthors$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(AuthorPageActions.loadAuthors),
        mergeMap(() => this.dataService.getAuthors()
          .pipe(
            map(authors => 
              AuthorApiActions.loadAuthorsSuccess({ authors })),
            catchError(error => 
              of(AuthorApiActions.loadAuthorsFailure({ error })))
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
