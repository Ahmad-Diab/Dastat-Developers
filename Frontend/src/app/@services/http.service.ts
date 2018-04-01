import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class HttpService {

  constructor(public http: Http) {

    console.log(environment);

   }

  get(url: string, data?: any) {
    this.http.get(environment.api + url, data);
  }

  post(url: string, data?: any) {
    this.http.post(environment.api + url, data);
  }
}
