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
      return this.post_auth('/getAdmin', data);
    }
    getAdmins(){
      return this.get_auth('/getAdmins');
    } 
   //----------------Booking Usher---------------------    
    getBookingUshers(){
      return this.get_auth('/getBookingUshers');
    }
    getBookingUsher(data){
      return this.post_auth('/getBookingUsher');
    }
    editBookingUsher(data){
      return this.post_auth('/editBookingUsher', data);
    }
    deleteBookingUsher(data){
      return this.post_auth('/deleteBookingUsher', data);
    }
    //----------------Branch Manager-------------------
    getBranchManagers(){
      return this.get_auth('/getBranchManagers');
    }
    getBranchManager(data){
      return this.post_auth('/getBranchManager', data);
    }
    editBranchManager(data){
      return this.post_auth('editBranchManager', data);
    }
    deleteBranchManager(data){
      return this.post_auth('/deleteBranchManager',data);
    }

    //----------------Cinema Owner---------------------
    getCinemaOwners(){
      return this.get_auth('/getCinemaOwners');
    }
    getCinemaOwner(data){
      return this.post_auth('/getCinemaOwner', data);
    }
    editCinemaOwner(data){
      return this.post_auth('editCinemaOwner', data);
    }
    deleteCinemaOwner(data){
      return this.post_auth('/deleteCinemaOwner',data);
    } 
}
