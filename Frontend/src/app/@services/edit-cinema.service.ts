import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
 import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
 

@Injectable()
export class EditCinemaService extends HttpService {

  constructor(public http: Http) {
    super(http);
  }
  editCinema(location:string, address:string, name:string, number_of_halls:number , company:string, imagePath:string) {
    return this.post('Cinemas/editCinema', {
    'address': address,
    'number_of_halls': number_of_halls,
    'company': company ,
    'imagePath' : imagePath 
    });
  }}

