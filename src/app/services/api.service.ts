import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {Image} from "../models/image";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'https://api.unsplash.com/'
  private searchWord$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  searchWordObs$: Observable<string> = this.searchWord$.asObservable();

  constructor(private http: HttpClient) { }

  getPhotos(page: number, top: number) {
    return this.http.get(
      `${this.url}photos/?page=${page}&per_page=${top}&client_id=${environment.accessKey}`)
      // @ts-ignore
      .pipe(map(items => items.map(i => new Image(i))))
  }

  getPhotosBySearchWord(page: number = 1, top: number = 100) {
      return this.http.get(
        `${this.url}search/photos?client_id=${environment.accessKey}&query=${this.searchWord}&page=${page}&per_page=${top}`)
        // @ts-ignore
        .pipe(map(item => item.results.map(i => new Image(i))))
  }

  get searchWord() {
    return this.searchWord$.value;
  }

  set searchWord(value: string) {
    this.searchWord$.next(value);
  }

}
