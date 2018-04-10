import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Http } from '@angular/http';

@Injectable()
export class ActorInfoService extends HttpService{

  constructor(public http: Http) {
    super(http);
    }
getActorInfo(actor_name: string){
  return this.get('actors/'+ actor_name);
}

}
