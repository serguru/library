import { createReducer, on } from "@ngrx/store";
import { AuthorState } from "../app.state";
import { AuthorApiActions, AuthorPageActions } from "./actions";

const initialState: AuthorState = {
    currentAuthorId: 0,
    authors: [],
    error: ''
}

export const authorReducer = createReducer<AuthorState>(
    initialState,
    on(AuthorApiActions.loadAuthorsSuccess, (state, action): AuthorState => {
        return {
            ...state,
            authors: action.authors,
            error: ''
        }
    }),
    on(AuthorApiActions.loadAuthorsFailure, (state, action): AuthorState => {
        return {
            ...state,
            authors: [],
            error: action.error
        }
    }),
    on(AuthorPageActions.setCurrentAuthor, (state, action): AuthorState => {
        return {
            ...state,
            currentAuthorId: action.currentAuthorId
        };
    }),
    on(AuthorApiActions.updateAuthorSuccess, (state, action): AuthorState => {
        const updatedAuthors = state.authors.map(
          item => action.author.id === item.id ? action.author : item);
        return {
          ...state,
          authors: updatedAuthors,
          currentAuthorId: action.author.id,
          error: ''
        };
      }),
)