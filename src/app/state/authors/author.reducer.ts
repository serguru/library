import { createReducer, on } from "@ngrx/store";
import { AuthorState } from "../app.state";
import { AuthorApiActions } from "./actions";

const initialState: AuthorState = {
    currentAuthorId: null,
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
    })
)