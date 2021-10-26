import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Author } from 'src/app/models/author';
import { Book } from 'src/app/models/book';
import { DataService } from 'src/app/services/data.service';
import { getAuthors } from 'src/app/state';
import { State } from 'src/app/state/app.state';
import { AuthorPageActions } from 'src/app/state/authors/actions';

@Component({
  selector: 'app-authors-shell',
  templateUrl: './authors-shell.component.html',
  styleUrls: ['./authors-shell.component.css']
})
export class AuthorsShellComponent implements OnInit {

  authors$: Observable<Author[]>;

  constructor(private store: Store<State>, private dataService: DataService) { }

  ngOnInit(): void {
    this.authors$ = this.store.select(getAuthors).pipe(
      tap(authors => {
        if (authors.length > 0) {
          this.selectedAuthor = authors[0];
          return;
        }
        this.selectedAuthor = undefined;
      })

    );

    this.store.dispatch(AuthorPageActions.loadAuthors());
  }

  authorWasSelected(author: Author) {
    this.selectedAuthor = author;
  }

  bookWasSelected(book: Book) {
    this.selectedBook = book;
  }


  private _selectedAuthor: Author;
  get selectedAuthor(): Author {
    return this._selectedAuthor;
  }
  set selectedAuthor(value: Author) {
    if (this.selectedAuthor === value) {
      return;
    }
    this._selectedAuthor = value;
    this.dataService.getBooks(value).subscribe(books => {
      this.books = books;
      if (books && books.length > 0) {
        this.selectedBook = books[0];
        return;
      }
      this.selectedBook = undefined;
    })
  }


  private _selectedBook: Book;
  get selectedBook(): Book {
    return this._selectedBook;
  }
  set selectedBook(value: Book) {
    if (this.selectedBook === value) {
      return;
    }
    this._selectedBook = value;
  }

  private _books: Book[];
  get books(): Book[] {
    return this._books;
  }
  set books(value: Book[]) {
    if (this.books === value) {
      return;
    }
    this._books = value;
  }




}
