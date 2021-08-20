import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LazyLoadImageModule } from "ng-lazyload-image";
import { NavigationComponent } from "./navigation/navigation.component";
import { RouterModule, Routes } from "@angular/router";
import {FavoritesComponent} from "./favorites/favorites.component";
import {NgxMasonryModule} from "ngx-masonry";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {FormsModule} from "@angular/forms";
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from '../reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {environment} from "../../environments/environment";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: GalleryComponent },
  { path: 'favorites', component:  FavoritesComponent },
  { path: '**', component: GalleryComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    FavoritesComponent,
    NavigationComponent,
    ConfirmModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    LazyLoadImageModule,
    RouterModule.forRoot(routes),
    NgxMasonryModule,
    InfiniteScrollModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
