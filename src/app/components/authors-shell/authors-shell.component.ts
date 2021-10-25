import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Author } from 'src/app/models/author';
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

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.authors$ = this.store.select(getAuthors);
    this.store.dispatch(AuthorPageActions.loadAuthors());
  }

}
