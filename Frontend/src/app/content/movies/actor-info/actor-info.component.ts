import { Component, OnInit } from '@angular/core';
import { ActorInfoService } from '../../../@services/actor-info.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/core'

@Component({
  selector: "app-actor-info",
  templateUrl: "./actor-info.component.html",
  styleUrls: ["./actor-info.component.css"]
})
export class ActorInfoComponent implements OnInit {
  actor;
  constructor(public ActorInfoService: ActorInfoService, private route : ActivatedRoute, 
    public cookie : CookieService) {

  }

  ngOnInit() {
    // this.route.params.subscribe( params => this.actor = params['name']);
    // console.log(this.actor);
    // this.ActorInfoService.getActorInfo(this.actor).subscribe((response)=>{
    //   this.actor=response.data[0];
    //   console.log(response.data[0]);
    // });
  }
}
