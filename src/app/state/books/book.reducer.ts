import { createReducer, on } from "@ngrx/store";
import { BookState } from "../app.state";
import { BookApiActions, BookPageActions } from "./actions";

const initialState: BookState = {
    currentBookId: 0,
    books: [],
    error: ''
}

export const bookReducer = createReducer<BookState>(
    initialState,
    on(BookApiActions.loadBooksSuccess, (state, action): BookState => {
        return {
            ...state,
            books: action.books,
            error: ''
        }
    }),
    on(BookApiActions.loadBooksFailure, (state, action): BookState => {
        return {
            ...state,
            books: [],
            error: action.error
        }
    }),
    on(BookPageActions.setCurrentBook, (state, action): BookState => {
        return {
            ...state,
            currentBookId: action.currentBookId
        };
    }),
)