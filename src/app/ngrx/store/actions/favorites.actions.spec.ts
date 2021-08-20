import * as fromFavorites from './favorites.actions';

describe('favoritesFavorites', () => {
  it('should return an actions', () => {
    expect(fromFavorites.favoritesFavorites().type).toBe('[Favorites] Favorites Favoritess');
  });
});
