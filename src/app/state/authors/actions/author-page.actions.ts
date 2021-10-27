import { createAction, props } from "@ngrx/store";

export const loadAuthors = createAction(
    '[Author Page] Load'
);

export const setCurrentAuthor = createAction(
    '[Author Page] Set Current Author',
    props<{ currentAuthorId: number }>()
);
