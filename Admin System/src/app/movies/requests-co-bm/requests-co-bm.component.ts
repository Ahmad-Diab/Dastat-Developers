import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../@services/movies.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-requests-co-bm',
  templateUrl: './requests-co-bm.component.html',
  styleUrls: ['./requests-co-bm.component.scss']
})
export class RequestsCoBmComponent implements OnInit {

  movies=[];
  admin_req;
  responeStatus='';
  moviesAction= false

  constructor(public movieServices: MoviesService,private router:Router,public cookie:CookieService, private route: ActivatedRoute) { }

  ngOnInit() {

  }

  viewReq(admin_requested: string){
    this.movieServices.viewRequests(admin_requested).subscribe((response)=>{
      this.movies=response;
      console.log(response.data[0]);
    
  });
  }


toogleMovie(){
  this.moviesAction = !this.moviesAction;
}


}
