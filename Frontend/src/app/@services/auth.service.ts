import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { map } from "rxjs/operators";

import { User } from '../@objects/user';
@Injectable()
export class AuthService {

  constructor(public http: Http) { }

  authenticateUser(user:User){
    return this.http.post(environment.api + 'login',user).pipe(map(res => res.json()));
  }

  register(user:User){
    return this.http.post(environment.api + 'register',user).pipe(map(res => res.json()));
  }

}