import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Author } from '../models/author';
import { Book } from '../models/book';
import { Genre } from '../models/genre';


export class LibraryData implements InMemoryDbService {

    createDb() {
        const authors: Author[] = [

            {
                id: 1,
                name: 'William Shakespeare'
            }, {
                id: 2,
                name: 'George Orwell'
            }, {
                id: 3,
                name: 'J.K. Rowling'
            }
        ];
        const genres: Genre[] = [
            {
                id: 1,
                name: 'Historical'
            }, {
                id: 2,
                name: 'Fantasy'
            }, {
                id: 3,
                name: 'Classic'
            }
        ];
        const books: Book[] = [
            {
                id: 1,
                name: 'Hamlet',
                authorIds: [1],
                genreIds: [1,3]
            },{
                id: 2,
                name: 'Romeo and Juliet',
                authorIds: [3],
                genreIds: [1,3]
            },{
                id: 3,
                name: 'The Icabog',
                authorIds: [1],
                genreIds: [2]
            },{
                id: 4,
                name: 'Harry Potter and the Cursed Child',
                authorIds: [3],
                genreIds: [2]
            }

        ];
        return { authors, genres, books };
    }
}
