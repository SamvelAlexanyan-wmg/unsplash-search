import { Component, OnInit } from '@angular/core';
import {NgxMasonryOptions} from "ngx-masonry";
import {Observable} from "rxjs";
import {select, Store} from "@ngrx/store";
import {selectFavorites, selectFavoritesCount} from "../../ngrx/store/selectors/favorites.selector";
import {take, tap} from "rxjs/operators";
import {FavoritesState} from "../../ngrx/store/reducers/favorites.reducer";
import {Image} from "../../models/image";
import {remove} from "../../ngrx/store/actions/favorites.actions";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  // @ts-ignore
  favorites$: Observable<Image[]>;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  masonryOptions: NgxMasonryOptions = {
    gutter: 10,
    horizontalOrder: true
  };
  private page = 1;

  constructor(
    private store: Store<FavoritesState>,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.favorites$ = this.store.pipe(select(selectFavorites), tap(items => console.log(items)))
  }

  onScrollDown() {

  }

  remove(event: MouseEvent, id: string) {
    event.preventDefault();
    this.modalService.open().closed.pipe(take(1))
      .subscribe(action => {
        console.log(action);
        action ? this.store.dispatch(remove(id)) : null
      }
  )
  }
}
