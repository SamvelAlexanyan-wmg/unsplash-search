import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import {environment} from "../../environments/environment";
import {favoritesReducer} from "../ngrx/store/reducers/favorites.reducer";


export interface State {

}

export const reducers: ActionReducerMap<State> = {
  favoritesState: favoritesReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
