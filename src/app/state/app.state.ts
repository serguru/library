import { Author } from "../models/author";
import { Book } from "../models/book";

export interface AuthorState {
    currentAuthorId: number;
    authors: Author[];
    error: string;
}

export interface BookState {
    currentBookId: number;
    books: Book[];
    error: string;
}

export interface State {
    authors: AuthorState;
    books: BookState;
}