import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY: string = 'u1cQKdr1jNtNwV0zrWmHCk4oSVH0wRzB';
const SERVICE_URL: string = 'https://api.giphy.com/v1/gifs';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _tagsHistory: string[] = [];
  private _gifsList: Gif[] = [];

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  get gifsList() {
    return [...this._gifsList];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('historicSearch', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    const historicSearch = localStorage.getItem('historicSearch');

    if (historicSearch) {
      this._tagsHistory = JSON.parse(historicSearch);
      if (this._tagsHistory.length > 0) {
        this.searchTag(this._tagsHistory[0]);
      }
    }
  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;

    const params = new HttpParams()
      .set('api_key', GIPHY_API_KEY)
      .set('limit', '12')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${SERVICE_URL}/search`, { params })
      .subscribe(
        (response) => {
          this.organizeHistory(tag);
          this._gifsList = response.data;
        },
        (error: HttpErrorResponse) => {
          alert(`Error fetching gifs -> ${error.status} ${error.error.meta.msg}\n\n${error.url}\n`);
        }
      );
  }
}
