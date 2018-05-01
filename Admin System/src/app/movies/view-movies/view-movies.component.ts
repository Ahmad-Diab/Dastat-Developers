import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MoviesService } from '../../@services/movies.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { throttle } from '@swimlane/ngx-charts/release/utils';
import { Auth } from '../../@guards/auth.guard';

@Component({
  selector: 'app-view-movies',
  templateUrl: './view-movies.component.html',
  styleUrls: ['./view-movies.component.scss']
})
export class ViewMoviesComponent implements OnInit {

  responeStatus="";
  moviesAction= false
  movies=[];
  username:string

  constructor(public movieServices: MoviesService,private router:Router,public cookie:CookieService, private route: ActivatedRoute) { }

 ngOnInit() {

    //-------VIEW ALL MOVIES------------------

        this.movieServices.viewAllMovies().subscribe((response)=>{
        this.movies = response;
        console.log(response);
        var auth = <Auth>(this.cookie.getObject('auth'));
        this.username = auth.username;
      });
  }
//-----------A FLAG -----------------------
toogleMovie(){
    this.moviesAction = !this.moviesAction;
}

//-------------EDIT A MOVIE-----------------
getMovieInfo(movie){
  this.router.navigate(['movies/info-edit/',movie.movie_id]);
}

//-------------DELETE A MOVIE-----------------
deleteMovie(movie_id: number){
  this.movieServices.deleteMovie(movie_id).subscribe((response)=>{
      this.responeStatus="Successfully deleted";
  });
}

///----------ADD A MOVIE--------------------------
addMovie(title: string, duration: any, genre: string, description: string,imagePath: string,cast: string, feature: number, release_date:Date,username: string){
    duration = duration && duration.length === 5 ? duration + ":00" : duration;
    let year = parseInt(((String) (release_date)).substring(0,4));
     this.movieServices.addMoviess(title,duration,genre,description,imagePath,cast,year,feature,release_date,5,username).subscribe((response)=>{
       this.responeStatus="Added";
       this.ngOnInit();
     });  
     
}
}
