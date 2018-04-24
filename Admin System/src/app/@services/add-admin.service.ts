
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { HttpService } from './http.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpModule } from '@angular/http';

@Injectable()
export class AddAdminService extends HttpService {

  constructor(public cookie: CookieService, public http: Http) {
    super(cookie, http);
  }

  viewAllCinemas(){
    return this.get('viewAllCinemas');
  }

  addBookingUsher(username : string, password: string, email:string,salary:string,first_name:string,last_name:string,phone_number:string,gender:string,cinema_name : string){
    return this.post('addBookingUsher',{
      'username' : username, 'password': password, 'email':email,
      'salary':salary,'first_name':first_name,'last_name':last_name,
      'phone_number':phone_number,'gender':gender,'cinema_name' : cinema_name
    });
}

  addBranchManager(username : string, password: string, email:string,salary:string,first_name:string,last_name:string,phone_number:string,gender:string,cinema_name : string){
    return this.post('addBranchManager',{
      'username' : username, 'password': password, 'email':email,
      'salary':salary,'first_name':first_name,'last_name':last_name,
      'phone_number':phone_number,'gender':gender,'cinema_name' : cinema_name
    });
} 
  addCinemaOwner(username : string, password: string, email:string,salary:string,first_name:string,last_name:string,phone_number:string,gender:string,cinema_name : string){
    return this.post('addCinemaOwner',{
    'username' : username, 'password': password, 'email':email,
    'salary':salary,'first_name':first_name,'last_name':last_name,
    'phone_number':phone_number,'gender':gender,'cinema_name' : cinema_name
  });
}

}