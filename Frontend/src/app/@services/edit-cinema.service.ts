import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
 import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
 

@Injectable()
export class EditCinemaService extends HttpService {

  constructor(public http: Http) {
    super(http);
  }
  editCinema(location:string, address:string, name:string, number_of_halls:number, is_3D:number,is_4D:number , company:string, imagePath:string, imagePath2:string) {
    return this.post('Cinemas/editCinema', {
    'address': address,
    'number_of_halls': number_of_halls,
    'is_3D':is_3D,
    'is_4D':is_4D,
    'company': company ,
    'imagePath' : imagePath,
    'imagePath2' : imagePath2 
    }); 
  }}

