import { Author } from "../models/author";

export interface AuthorState {
    currentAuthorId: number;
    authors: Author[];
    error: string;
}

export interface State {
    authors: AuthorState;
}