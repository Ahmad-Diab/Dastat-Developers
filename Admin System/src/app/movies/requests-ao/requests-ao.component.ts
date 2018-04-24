import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../@services/movies.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Auth } from '../../@guards/auth.guard';
@Component({
  selector: 'app-requests-ao',
  templateUrl: './requests-ao.component.html',
  styleUrls: ['./requests-ao.component.scss']
})
export class RequestsAoComponent implements OnInit {


  movies=[];
  admin_req;
  responeStatus='';
  moviesAction= false
  username:string

  constructor(public movieServices: MoviesService,private router:Router,public cookie:CookieService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.movieServices.viewALlRequests().subscribe((response)=>{
      this.movies = response;
      console.log(response);
      var auth = <Auth>(this.cookie.getObject('auth'));
      this.username = auth.username;
    });
  }

  acceptReq(movie_id:number){
    this.movieServices.acceptRequest(movie_id).subscribe((response)=>{
      this.responeStatus='Accepted';
      console.log(this.responeStatus);
    });
    this.ngOnInit();
  }
  rejectReq(movie_id:number){
    this.movieServices.rejectRequest(movie_id).subscribe((response)=>{
      this.responeStatus='Rejected';
      console.log(this.responeStatus);
    });
    this.ngOnInit();
  }
}
