import { createAction, props } from "@ngrx/store";

export const loadBooks = createAction(
    '[Book Page] Load Books',
    props<{ currentAuthorId: number }>()
);

export const setCurrentBook = createAction(
    '[Book Page] Set Current Book',
    props<{ currentBookId: number }>()
);

