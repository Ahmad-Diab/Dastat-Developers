
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

 //--------------- edit profile mail, first & last name, phone, age using username as id----------------
  editProfile(email:string,first_name:string, last_name:string, phone_number:number, age:number,username:string) {
return this.post('users/editProfile/'+username, {
  'email':email,
'first_name': first_name,
'last_name': last_name,
'phone_number': phone_number,
'age': age
});
}

}
