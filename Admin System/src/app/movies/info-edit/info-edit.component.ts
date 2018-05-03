import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../@services/movies.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Auth } from '../../@guards/auth.guard';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-info-edit',
  templateUrl: './info-edit.component.html',
  styleUrls: ['./info-edit.component.scss']
})
export class InfoEditComponent implements OnInit {
  movie;
  movieEdit= false
  username: string;
  type: string;
  showFeatureAndRating: boolean;
  
  constructor(public MoviesService: MoviesService,private route : ActivatedRoute, 
    public cookie : CookieService ) { }

  ngOnInit() {
    this.type = this.cookie.getObject('auth')['type'];
    if (this.type == 'App Owner') { this.showFeatureAndRating = true }
    this.route.params.subscribe( params => this.movie = params['movie_id']);
    console.log(this.movie);
    this.MoviesService.getMovieInfo(this.movie).subscribe((response)=>{
      this.movie=response.data[0];
      let pipe = new DatePipe('en-US');
      const movieDate = pipe.transform(this.movie.release_date, 'MM/dd/yyyy');
      this.movie.release_date = movieDate;
      console.log(response.data[0]);
      var auth = <Auth>(this.cookie.getObject('auth'));
    this.username = auth.username;
    });
  }
  toogleEdit(){
    this.movieEdit = !this.movieEdit;
  }

  //---------EDIT A MOVIE----------------
editMovie(title: string, duration: any, genre: string, description: string,imagePath: string,cast: string,feature: number, release_date:Date,rating: number,username: string,movie_id: string){
      console.log(typeof duration)
      duration = duration && duration.length === 5 ? duration + ":00" : duration;
      let year = parseInt(((String) (release_date)).substring(0,4));
      console.log(release_date);
      this.MoviesService.editMovie(title,duration,genre,description,imagePath,cast,year,feature,release_date,rating,username,movie_id).subscribe((response)=>{
          this.ngOnInit();
        });  
  }

  putMovieInCookie(){
    this.cookie.putObject('movie' , this.movie);
  } 

}
