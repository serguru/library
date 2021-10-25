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
  