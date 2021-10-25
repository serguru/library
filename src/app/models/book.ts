import { Author } from "./author";
import { Genre } from "./genre";

export interface Book {
    id: number,
    name: string,
    authorIds: number[],
    genreIds: number[]
}