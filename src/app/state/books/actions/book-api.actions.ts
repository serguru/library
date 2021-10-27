import { createAction, props } from "@ngrx/store";
import { Book } from "src/app/models/book";

export const loadBooksSuccess = createAction(
    '[Book API] Load Success',
    props<{ books: Book[] }>()
  );
  
  export const loadBooksFailure = createAction(
    '[Book API] Load Fail',
    props<{ error: string }>()
  );
  