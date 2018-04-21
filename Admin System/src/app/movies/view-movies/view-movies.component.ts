import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../@services/movies.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { throttle } from '@swimlane/ngx-charts/release/utils';

@Component({
  selector: 'app-view-movies',
  templateUrl: './view-movies.component.html',
  styleUrls: ['./view-movies.component.scss']
})
export class ViewMoviesComponent implements OnInit {

  responeStatus="";
  moviesAction= false
  movies=[];

  constructor(public movieServices: MoviesService,private router:Router,public cookie:CookieService, private route: ActivatedRoute) { }

 ngOnInit() {

    //-------VIEW ALL MOVIES------------------

        this.movieServices.viewAllMovies().subscribe((response)=>{
        this.movies = response;
        console.log(response);
      });
  }
//-----------A FLAG -----------------------
toogleMovie(){
    this.moviesAction = !this.moviesAction;
}


}
