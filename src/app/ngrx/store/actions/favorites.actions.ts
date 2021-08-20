import { createAction } from '@ngrx/store';
import {Image} from "../../../models/image";

export const add = createAction('[Favorites] Add', (favorite: Image) => ({favorite}));
export const remove = createAction('[Favorites] Remove', (id: string) => ({id}));
export const reset = createAction('[Favorites] Reset');





