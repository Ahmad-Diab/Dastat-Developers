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
addMovie(title: string, duration: number, genre: string, description: string,imagePath: string,cast: string,
  year: number, feature: number, release_date:Date,rating: number,status: string,admin_requested: string){

     this.movieServices.addMoviess(title,duration,genre,description,imagePath,cast,year,feature,release_date,rating,status,admin_requested).subscribe((response)=>{
       this.responeStatus="Added";
       this.ngOnInit();
     });  
     
}
}
