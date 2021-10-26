import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Author } from 'src/app/models/author';
//import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  @Input() authors: Author[];
  @Input() selected: Author;
  @Output() authorWasSelected = new EventEmitter<Author>();
  


  constructor() { }

  ngOnInit(): void {

  }

  authorClass(author: Author) {
    return {
      "author": true,
      "selected": this.selected && this.selected === author
    }
  }

  authorClick(author: Author) {
    this.authorWasSelected.emit(author);
  }
}
