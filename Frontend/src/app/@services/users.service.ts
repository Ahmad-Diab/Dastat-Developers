
import { HttpService } from './http.service';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { User } from '../@objects/user'
import { Injectable } from '@angular/core';

@Injectable()
export class UsersService extends HttpService {

  constructor(public http: Http) {
    super(http);
  }

  getUsers(){
    return this.http.get('user/getusers');
  }
  
  viewMyInfo(data){
    return this.get('users/viewMyInfo',data);
  }
  
}
