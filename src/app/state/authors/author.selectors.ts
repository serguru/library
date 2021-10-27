import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthorState } from "../app.state";

export const getAuthorFeatureState = createFeatureSelector<AuthorState>('authors');

export const getAuthors = createSelector(
    getAuthorFeatureState,
    state => state.authors
)

export const getError = createSelector(
    getAuthorFeatureState,
    state => state.error
)

export const getCurrentAuthorId = createSelector(
    getAuthorFeatureState,
    state => state.currentAuthorId
)

export const getCurrentAuthor = createSelector(
    getAuthorFeatureState,
    getCurrentAuthorId,
    (state, currentAuthorId) => {
        if (currentAuthorId === 0) {
            return {
                id: 0,
                name: ''
            };
        } else {
            return currentAuthorId ? state.authors.find(p => p.id === currentAuthorId) : null;
        }
    }
);

