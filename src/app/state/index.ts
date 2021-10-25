import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthorState } from "./app.state";

export const getAuthorFeatureState = createFeatureSelector<AuthorState>('authors');

export const getAuthors = createSelector(
    getAuthorFeatureState,
    state => state.authors
)

export const getError = createSelector(
    getAuthorFeatureState,
    state => state.error
)

