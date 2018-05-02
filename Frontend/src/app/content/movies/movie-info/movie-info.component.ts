import { Component, OnInit } from '@angular/core';
import { MovieInfoService } from '../../../@services/movie-info.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
import { CinemaslistService } from '../../../@services/cinemaslist.service'

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {
movie;
dates = [];
date;
  constructor(public MovieInfoService: MovieInfoService, private route : ActivatedRoute, 
  public cookie : CookieService,public CinemaslistService : CinemaslistService) { 
  }

ngOnInit(){

  this.route.params.subscribe( params => this.movie = params['movie_id']);
  console.log(this.movie);
  this.MovieInfoService.getMovieInfo(this.movie).subscribe((response)=>{
    this.movie=response.data[0];
    console.log(response.data[0]);
  });
}

putMovieInCookie(){
  this.cookie.putObject('movie' , this.movie);
} 
hey(){
  console.log("done");
} 
}
