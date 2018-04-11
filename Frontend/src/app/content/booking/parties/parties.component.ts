import { Component, OnInit } from '@angular/core';
import { PartiesService } from '../../../@services/parties.service';
import { MovieslistService } from '../../../@services/movieslist.service';
import {Router, ActivatedRoute, Params} from '@angular/router'
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css']
})
export class PartiesComponent implements OnInit {
  parties=[];
  movies=[];
  selectedCinema;
  selectedMovie;
  date;

  constructor(public partiesService:PartiesService,
    public router : Router,
    public route: ActivatedRoute,
    public cookie : CookieService,
    public movieslistService: MovieslistService) { 

  //   this.route.params.subscribe((params: Params )=> {
  //   this.cinemaName = params['name'];
  //   this.movieName = params['location'];
  //   this.date = params['date'];
  // });
}

  // cinemaName;
  // movieName;
  // date;

  ngOnInit() {
    var cinemaName = "Mayo Movies",
        movieName = "13",
        date = "2018-4-12";

    this.viewMovies();
    this.selectedCinema = this.cookie.getObject('cinema');
    this.selectedMovie = this.cookie.getObject('movie');
    

    
  }
  viewMovies(){
    this.movieslistService.getMovies().subscribe((response)=>{
      this.movies=response;
      console.log(response);
      
    });
  }

  updateMovie(movie){
    this.selectedMovie = movie;
    
  }
  getPartiesAtThisDate(){
    this.partiesService.getParties(this.selectedCinema.location ,this.selectedCinema.name , this.selectedMovie.movie_id , this.date).subscribe((response) =>{
      this.parties = response.data;
      console.log(response.data);

    });
  }
  

}
