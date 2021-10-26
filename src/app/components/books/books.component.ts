import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  @Input() books: Book[];
  @Input() selected: Book;
  @Output() bookWasSelected = new EventEmitter<Book>();
  
  constructor() { }

  ngOnInit(): void {
  }

  bookClass(book: Book) {
    return {
      "book": true,
      "selected": this.selected && this.selected === book
    }
  }

  bookClick(book: Book) {
    this.bookWasSelected.emit(book);
  }


}
