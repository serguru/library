import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { distinctUntilChanged, takeUntil, tap } from 'rxjs/operators';
import { Author } from 'src/app/models/author';
import { Book } from 'src/app/models/book';
import { DataService } from 'src/app/services/data.service';
import { getAuthors, getCurrentAuthor, getCurrentAuthorId } from 'src/app/state/authors/author.selectors';
import { State } from 'src/app/state/app.state';
import { AuthorPageActions } from 'src/app/state/authors/actions';
import { getBooks, getCurrentBook } from 'src/app/state/books/book.selectors';
import { BookPageActions } from 'src/app/state/books/actions';
import { UnsubscriptionHandler } from 'src/app/helpers/unsubscription-handler';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthorDialogComponent } from '../author-dialog/author-dialog.component';

@Component({
  selector: 'app-authors-shell',
  templateUrl: './authors-shell.component.html',
  styleUrls: ['./authors-shell.component.css']
})
export class AuthorsShellComponent extends UnsubscriptionHandler implements OnInit {

  authors$: Observable<Author[]>;
  books$: Observable<Book[]>;

  selectedAuthor: Author;

  selectedBook$: Observable<Book>;
  authorDisabled: boolean = true;
  dialogRef: any;


  constructor(
    private store: Store<State>,
    private dataService: DataService,
    private dialog: MatDialog
  ) {
    super();

  }


  ngOnInit(): void {

    this.authors$ = this.store.select(getAuthors).pipe(
      tap(authors => {
        if (authors.length > 0) {
          //this.store.dispatch(AuthorPageActions.setCurrentAuthor({ currentAuthorId: authors[0].id }));
          return;
        }
        this.store.dispatch(AuthorPageActions.setCurrentAuthor({ currentAuthorId: undefined }));
      })
    );
    this.store.dispatch(AuthorPageActions.loadAuthors());

    this.store.select(getCurrentAuthor).pipe(
      takeUntil(this.unsubscribe$),
      tap(author => {
        this.selectedAuthor = author;
        this.authorDisabled = !author;
      })
    ).subscribe();


    this.store.select(getCurrentAuthorId)
      .pipe(
        takeUntil(this.unsubscribe$),
        distinctUntilChanged(),
        tap(currentAuthorId => {
          this.store.dispatch(BookPageActions.setCurrentBook({ currentBookId: null }));
          this.store.dispatch(BookPageActions.loadBooks({ currentAuthorId }));
        })
      ).subscribe();


    this.books$ = this.store.select(getBooks).pipe(
      tap(books => {
        const currentBookId = books && books.length > 0 ? books[0].id : null;
        this.store.dispatch(BookPageActions.setCurrentBook({ currentBookId }));
      })
    );

    this.selectedBook$ = this.store.select(getCurrentBook);
  }

  authorWasSelected(author: Author) {
    this.store.dispatch(AuthorPageActions.setCurrentAuthor({ currentAuthorId: author.id }));
  }

  bookWasSelected(book: Book) {
    this.store.dispatch(BookPageActions.setCurrentBook({ currentBookId: book.id }));
  }

  createConfig(author: Author) {
    const result: MatDialogConfig = new MatDialogConfig();
    result.disableClose = true;
    result.autoFocus = true;
    result.width = '400px';
    result.data = {
      author: author
    }
    return result;
  }

  addAuthor() {
    this.dialogRef = this.dialog.open(AuthorDialogComponent, this.createConfig(
      {
        id: 0,
        name: ''
      }
    ));
  }
  editAuthor() {
    this.dialogRef = this.dialog.open(AuthorDialogComponent, this.createConfig(this.selectedAuthor));
  }

  deleteAuthor() {

  }
}
