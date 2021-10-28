import { createAction, props } from "@ngrx/store";
import { Author } from "src/app/models/author";

export const loadAuthorsSuccess = createAction(
  '[Author API] Load Success',
  props<{ authors: Author[] }>()
);

export const loadAuthorsFailure = createAction(
  '[Author API] Load Fail',
  props<{ error: string }>()
);

export const updateAuthorSuccess = createAction(
  '[Author API] Update Author Success',
  props<{ author: Author }>()
);

export const updateAuthorFailure = createAction(
  '[Author API] Update Author Fail',
  props<{ error: string }>()
);

export const createAuthorSuccess = createAction(
  '[Author API] Create Author Success',
  props<{ author: Author }>()
);

export const createAuthorFailure = createAction(
  '[Author API] Create Author Fail',
  props<{ error: string }>()
);

export const deleteAuthorSuccess = createAction(
  '[Author API] Delete Author Success',
  props<{ authorId: number }>()
);

export const deleteAuthorFailure = createAction(
  '[Author API] Delete Author Fail',
  props<{ error: string }>()
);
