import { Component, OnInit } from '@angular/core';
import { ActorInfoService } from '../../@services/actor-info.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {
actor;
  constructor(public ActorInfoService: ActorInfoService, private route : ActivatedRoute ) { 

  }

  ngOnInit() {
    this.route.params.subscribe( params => this.actor = params['actor_name']);
  console.log(this.actor);
  this.ActorInfoService.getActorInfo(this.actor).subscribe((response)=>{
    this.actor=response.data[0];
    console.log(response.data[0]);
  });
  }

}
