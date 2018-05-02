import { Component, OnInit } from '@angular/core';
import { MovieInfoService } from '../../../@services/movie-info.service';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {
movie;
  constructor(public MovieInfoService: MovieInfoService, private route : ActivatedRoute, 
  public cookie : CookieService) { 

  }

ngOnInit(){

  this.route.params.subscribe( params => this.movie = params['movie_id']);
  console.log(this.movie);
  this.MovieInfoService.getMovieInfo(this.movie).subscribe((response)=>{
    this.movie=response.data[0];
    console.log(response.data[0]);
  });
}

Book_or_Signin(movie){
  if (this.cookie.get("username")){
    this.cookie.putObject('movie' , movie);
    window.open('booking/cinemas',"_self");
  }
  else{
    window.open('/signin',"_self")
    this.ngOnInit();
  }
}

putMovieInCookie(){
  this.cookie.putObject('movie' , this.movie);
} 
hey(){
  console.log("done");
} 
}
