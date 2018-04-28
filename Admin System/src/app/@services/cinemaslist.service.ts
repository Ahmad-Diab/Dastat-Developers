import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Http } from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';
@Injectable()
export class CinemaslistService extends HttpService {

  
    constructor(public cookie: CookieService, 
        public http: Http) {
          super(cookie, http);
        }

  getAllCinemas(){
    return this.get_auth('adminviewCinemas');
  }
  Update(key1: String,key2: String,cinema){
    return this.post_auth('/Cinemas/editCinema/'+key1+'/'+key2,cinema);
  }
  delete(key1: String,key2: String){
    return this.get_auth('/mycinemas/delete/'+key1+'/'+key2);
  }
  addCinema(addedCinema:any){
    console.log(addedCinema);
    return this.post_auth('addCinema',addedCinema);
  }
}
