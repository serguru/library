import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api'
import { LibraryData } from './helpers/library-data';
import { AuthorsComponent } from './components/authors/authors.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AuthorsShellComponent } from './components/authors-shell/authors-shell.component';
import { authorReducer } from './state/authors/author.reducer';
import { AuthorEffects } from './state/authors/author.effects';
import { MaterialModule } from './material/material.module';
import { BooksComponent } from './components/books/books.component';
import { bookReducer } from './state/books/book.reducer';
import { BookEffects } from './state/books/book.effects';

@NgModule({
  declarations: [
    AppComponent,
    AuthorsComponent,
    AuthorsShellComponent,
    BooksComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HttpClientInMemoryWebApiModule.forRoot(LibraryData),
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature('authors', authorReducer),
    StoreModule.forFeature('books', bookReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([AuthorEffects, BookEffects]),
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
