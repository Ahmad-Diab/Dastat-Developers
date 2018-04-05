import{ Injectable } from '@angular/core';
import{ Http } from '@angular/http';
import{ environment } from '../../environments/environment';
import { User } from '../@objcts/user';
import 'rxjs/add/operator/map';
@Injectable()
export class authService{
  constructor(public http: Http){}

  register(user:User){
    
      return this.http.post(environment.api+'register',user).map(res=>res.json());
  }
}