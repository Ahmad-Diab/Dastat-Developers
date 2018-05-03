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
      return this.post_auth('getAdmin', data);
    }
    getAdmins(){
      return this.get_auth('getAdmins');
    } 
   //----------------Booking Usher---------------------    
    getBookingUshers(data){
      return this.get_auth('getBookingUshers' , data);
    }
    getBookingUsher(data){
      return this.post_auth('getBookingUsher');
    }
    editBookingUsher(data){
      return this.post_auth('editBookingUsher', data);
    }
    deleteBookingUsher(data){
      return this.post_auth('deleteBookingUsher', data);
    }
    addBookingUsher(data){
      return this.post_auth('addBookingUsher',data);
    }

    //----------------Branch Manager-------------------
    getBranchManagers(data){
      return this.get_auth('getBranchManagers' , data);
    }
    getBranchManager(data){
      return this.post_auth('getBranchManager', data);
    }
    editBranchManager(data){
      return this.post_auth('editBranchManager', data);
    }
    deleteBranchManager(data){
      return this.post_auth('deleteBranchManager',data);
    }
    addBranchManager(data){
      return this.post_auth('addBranchManager',data);
    }

    //----------------Cinema Owner---------------------
    getCinemaOwners(){
      return this.get_auth('getCinemaOwners');
    }
    getCinemaOwner(data){
      return this.post_auth('getCinemaOwner', data);
    }
    editCinemaOwner(data){
      return this.post_auth('editCinemaOwner', data);
    }
    deleteCinemaOwner(data){
      return this.post_auth('deleteCinemaOwner',data);
    }
    addCinemaOwner(data){
      return this.post_auth('addCinemaOwner',data);
    }
}
