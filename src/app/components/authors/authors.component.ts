import { Component, Input, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author';
//import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  @Input()
  authors: Author[];

//  constructor(public dataService: DataService) { }
  constructor() { }

  ngOnInit(): void {
    // this.dataService.getAuthors().subscribe(
    //   authors => this.authors = authors
    // )

  }

}
