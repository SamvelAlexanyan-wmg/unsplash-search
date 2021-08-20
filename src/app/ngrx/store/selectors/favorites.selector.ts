import {createSelector} from '@ngrx/store';

// @ts-ignore
export const selectFavoritesCount = createSelector(state => state.favoritesState.count,
    value => value);

// @ts-ignore
export const selectFavorites = createSelector(state => state.favoritesState.favorites,
  value => value);
