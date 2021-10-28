import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from "@angular/material/dialog";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Author } from 'src/app/models/author';
import { Store } from '@ngrx/store';
import { State } from 'src/app/state/app.state';
import { AuthorPageActions } from 'src/app/state/authors/actions';

@Component({
  selector: 'app-author-dialog',
  templateUrl: './author-dialog.component.html',
  styleUrls: ['./author-dialog.component.css']
})
export class AuthorDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private store: Store<State>,
    @Inject(MAT_DIALOG_DATA) public config: any,
    private dialogRef: MatDialogRef<AuthorDialogComponent>,
    private fb: FormBuilder
  ) {
    this.form = fb.group({
      name: [config.author.name, Validators.required],
    });
  }

  ngOnInit() {

  }

  get title(): string {
    return this.config.author.id > 0 ? "Edit author" : "Add author";
  }

  save() {

    const author: Author = {
      id: this.config.author.id,
      name: this.config.author.name,
      ... this.form.value
    }

    if (author.id > 0) {
      this.store.dispatch(AuthorPageActions.updateAuthor({author}));
    } else {
      this.store.dispatch(AuthorPageActions.createAuthor({author}));
    }

    this.close();

  }

  close() {
    this.dialogRef.close();
  }

}


