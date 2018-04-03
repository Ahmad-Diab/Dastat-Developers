import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { map } from "rxjs/operators";

@Injectable()
export class HttpService {

  constructor(public http: Http) { }

  get(url: string, data?: any) {
    return this.http.get(environment.api + url, {params: data}).pipe(map(res => res.json()));
  }

  post(url: string, data?: any) {
    return this.http.post(environment.api + url, data).pipe(map(res => res.json()));
  }
}