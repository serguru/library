import { createAction, props } from "@ngrx/store";
import { Author } from "src/app/models/author";

export const loadAuthors = createAction(
    '[Author Page] Load'
);

export const setCurrentAuthor = createAction(
    '[Author Page] Set Current Author',
    props<{ currentAuthorId: number }>()
);

export const createAuthor = createAction(
    '[Author Page] Create Author',
    props<{ author: Author }>()
);


export const updateAuthor = createAction(
    '[Author Page] Update Author',
    props<{ author: Author }>()
);


export const deleteAuthor = createAction(
    '[Author Page] Delete Author',
    props<{ authorId: number }>()
);


