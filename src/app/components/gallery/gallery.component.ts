import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgxMasonryComponent, NgxMasonryOptions} from "ngx-masonry";
import {switchMap, take, takeUntil, tap} from "rxjs/operators";
import {FavoritesState} from "../../ngrx/store/reducers/favorites.reducer";
import {BaseComponent} from "../../base.component";
import {ApiService} from "../../services/api.service";
import {of, timer} from "rxjs";
import {Store} from "@ngrx/store";
import {Image} from "../../models/image";
import {add, remove} from "../../ngrx/store/actions/favorites.actions";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent extends BaseComponent implements OnInit, OnDestroy {
  // @ts-ignore
  @ViewChild(NgxMasonryComponent) masonry: NgxMasonryComponent;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  items: Image[] = [];
  masonryOptions: NgxMasonryOptions = {
    gutter: 10,
    horizontalOrder: true
  };
  private page = 1;

  constructor(
    private apiService: ApiService,
    private store: Store<FavoritesState>,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getPhotos()
    this.getPhotosBySearchWord();
  }

  onScrollDown() {
    if (!this.apiService.searchWord) {
      this.page++;
      this.getPhotos();
    }
  }

  saveToFavorites(event: MouseEvent, favorite: Image) {
      event.preventDefault();
      if(favorite.selected) {
        this.store.dispatch(remove(favorite.id))
      } else {
        this.store.dispatch(add({...favorite}))
      }
      favorite.selected = !favorite.selected;
  }

  private getPhotos() {
    this.apiService.getPhotos(this.page, 100)
      .pipe(take(1))
      .subscribe((resp: any) => {
        this.items = this.page === 1 ? resp : [...this.items, ...resp];
        this.reloadMasonry();
      });
  }

  private getPhotosBySearchWord() {
    this.apiService.searchWordObs$
      .pipe(
        switchMap(word => {
          if (word) {
            return this.apiService.getPhotosBySearchWord().pipe(tap(data => {
              // @ts-ignore
              this.items = data;
              this.reloadMasonry();
            }));
          }
          this.page = 1;
          return of(this.getPhotos());
        }),
        takeUntil(this.destroyed$)
      )
      .subscribe();
  }

  private reloadMasonry() {
    timer(100).pipe(take(1)).subscribe(() => {
      this.masonry?.reloadItems();
      this.masonry?.layout();
    })
  }

  ngOnDestroy() {
    this.destroy();
    this.items = [];
  }
}
