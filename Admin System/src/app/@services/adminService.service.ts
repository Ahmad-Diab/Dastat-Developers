import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HttpService } from './http.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Time } from '@angular/common';

@Injectable()
export class AdminService extends HttpService {

  constructor(public cookie: CookieService, public http: Http) {
    super(cookie, http);
    }
    //---------Serach by a certain cinema--------------

    getAdmin(data){
      console.log(data);
      return this.post('/getAdmin', data);
    }
    getAdmins(){
      return this.get('/getAdmins');
    } 
   //----------------Booking Usher---------------------    
    getBookingUshers(){
      return this.get('/getBookingUshers');
    }
    editBookingUsher(data){
      return this.post('/editBookingUsher', data);
    }
    deleteBookingUsher(data){
      return this.post('/deleteBookingUsher', data);
    }
    //----------------Branch Manager-------------------
    getBranchManagers(){
      return this.get('/getBranchManagers');
    }
    editBranchManager(data){
      return this.post('editBranchManager', data);
    }
    deleteBranchManager(data){
      return this.post('/deleteBranchManager',data);
    }

    //----------------Cinema Owner---------------------
    getCinemaOwners(){
      return this.get('/getCinemaOwners');
    }
    editCinemaOwner(data){
      return this.post('editCinemaOwner', data);
    }
    deleteCinemaOwner(data){
      return this.post('/deleteCinemaOwner',data);
    } 
}
