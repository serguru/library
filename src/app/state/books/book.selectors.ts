import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BookState } from "../app.state";
import { getCurrentAuthorId } from "../authors/author.selectors";

export const getBookFeatureState = createFeatureSelector<BookState>('books');

export const getBooks = createSelector(
    getBookFeatureState,
    state => state.books
)

export const getError = createSelector(
    getBookFeatureState,
    state => state.error
)


export const getCurrentBookId = createSelector(
    getBookFeatureState,
    state => state.currentBookId
)

export const getCurrentBook = createSelector(
    getBookFeatureState,
    getCurrentBookId,
    (state, currentBookId) => {
        if (currentBookId === 0) {
            return {
                id: 0,
                name: '',
                authorIds: [],
                genreIds: []
            };
        } else {
            return currentBookId ? state.books.find(p => p.id === currentBookId) : null;
        }
    }
);

