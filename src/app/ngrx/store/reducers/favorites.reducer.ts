import {add, remove, reset} from "../actions/favorites.actions";
import { createReducer, on } from '@ngrx/store';
import {Image} from "../../../models/image";

export const favoritesFeatureKey = 'favorites';

export interface FavoritesState {
  favorites: Image[];
  count: number;
}
export const initialState: FavoritesState = {
  favorites: [],
  count: 0
};

const _favoritesReducer = createReducer(initialState,
  on(add, (state, {favorite}) => ({
    ...state,
    favorites: [...state.favorites, favorite],
    count: state.favorites.length + 1
  })),
  on(remove, (state, {id}) => ({
    ...state,
    favorites: state.favorites.filter(f => f.id !== id),
    count: state.count - 1
  })),
  on(reset, state => ({
    favorites: [],
    count: 0
  })),
);

export function favoritesReducer(state: any, action: any) {
  return _favoritesReducer(state, action);
}
