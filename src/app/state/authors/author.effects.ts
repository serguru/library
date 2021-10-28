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

  updateAuthor$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(AuthorPageActions.updateAuthor),
        concatMap(action =>
          this.dataService.updateAuthor(action.author)
            .pipe(
              map(author => AuthorApiActions.updateAuthorSuccess({ author })),
              catchError(error => of(AuthorApiActions.updateAuthorFailure({ error })))
            )
        )
      );
  });

  createAuthor$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(AuthorPageActions.createAuthor),
        concatMap(action =>
          this.dataService.createAuthor(action.author)
            .pipe(
              map(author => AuthorApiActions.createAuthorSuccess({ author })),
              catchError(error => of(AuthorApiActions.createAuthorFailure({ error })))
            )
        )
      );
  });

  deleteAuthor$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(AuthorPageActions.deleteAuthor),
        mergeMap(action =>
          this.dataService.deleteAuthor(action.authorId).pipe(
            map(() => AuthorApiActions.deleteAuthorSuccess({ authorId: action.authorId })),
            catchError(error => of(AuthorApiActions.deleteAuthorFailure({ error })))
          )
        )
      );
  });

}
