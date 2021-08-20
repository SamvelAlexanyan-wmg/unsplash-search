import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationStart, Router} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {debounceTime, filter, takeUntil, tap} from "rxjs/operators";
import {fromEvent, Observable} from "rxjs";
import {BaseComponent} from "../../base.component";
import {select, Store} from "@ngrx/store";
import {FavoritesState} from "../../ngrx/store/reducers/favorites.reducer";
import {selectFavoritesCount} from "../../ngrx/store/selectors/favorites.selector";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  // @ts-ignore
  @ViewChild('searchInputRef') searchInput: ElementRef
  // @ts-ignore
  favoritesCount$: Observable<number>;

  constructor(
    public router: Router,
    private apiService: ApiService,
    private store: Store<FavoritesState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.favoritesCount$ = this.store.pipe(select(selectFavoritesCount), tap(c => console.log(c)))
    this.router.events.pipe(
      takeUntil(this.destroyed$),
      filter(event => event instanceof NavigationStart)
    ).subscribe(event => {
      // @ts-ignore
      if (event.url.includes('favorites')) {
        this.apiService.searchWord = ''
      }
    })
  }

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        takeUntil(this.destroyed$),
        debounceTime(500)
        // @ts-ignore
      ).subscribe(event => this.apiService.searchWord = event.target.value)
  }

  ngOnDestroy() {
    this.destroy();
  }
}
