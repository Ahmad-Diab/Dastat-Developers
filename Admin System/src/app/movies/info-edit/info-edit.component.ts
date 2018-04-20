import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../@services/movies.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-info-edit',
  templateUrl: './info-edit.component.html',
  styleUrls: ['./info-edit.component.scss']
})
export class InfoEditComponent implements OnInit {
  movie;
  movieEdit= false

  constructor(public MoviesService: MoviesService,private route : ActivatedRoute, 
    public cookie : CookieService ) { }

  ngOnInit() {
    this.route.params.subscribe( params => this.movie = params['movie_id']);
    console.log(this.movie);
    this.MoviesService.getMovieInfo(this.movie).subscribe((response)=>{
      this.movie=response.data[0];
      console.log(response.data[0]);
    });
  }
  toogleEdit(){
    this.movieEdit = !this.movieEdit;
  }

  putMovieInCookie(){
    this.cookie.putObject('movie' , this.movie);
  } 

}
