import { Component, OnInit } from '@angular/core';
import { PartiesService } from '../../../@services/parties.service';
import { MovieslistService } from '../../../@services/movieslist.service';
import {Router, ActivatedRoute, Params} from '@angular/router'
import { CookieService } from 'angular2-cookie/core';
import { BookingService } from '../../../@services/booking.service';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css']
})
export class PartiesComponent implements OnInit {
  parties=[];
  movies=[];
  cinemas=[];
  selectedCinema;
  selectedMovie;
  selectedParty;
  date;

  constructor(public partiesService:PartiesService,
    public router : Router,
    public route: ActivatedRoute,
    public cookie : CookieService,
    public movieslistService: MovieslistService,
    public bookingService: BookingService) { 

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
  viewCinemas(){
    this.bookingService.getMoviesForThisCinema(this.selectedMovie.movie_id).subscribe((response) => {
      this.cinemas=response.data;
      console.log(this.cinemas);
    });
  }

  updateMovie(movie){
    this.selectedMovie = movie;
    // this.cookie.putObject('movie' , this.selectedMovie);    
    this.viewCinemas();
  }

  updateCinema(cinema){
    this.selectedCinema = cinema;
    // this.cookie.putObject('cinema' , this.selectedCinema);    
  }

  updateParty(party){
    this.selectedParty = party;
  }

  submitParty(){

    this.cookie.putObject('cinema' , this.selectedCinema);  
    this.cookie.putObject('movie' , this.selectedMovie); 
    this.cookie.putObject('party' , this.selectedParty); 

    var booking = {
      username: this.cookie.get('username'),
      cinema_name: this.selectedCinema.cinema_name,
      cinema_location: this.selectedCinema.cinema_location,
      hall_number: this.selectedParty.hall,
      datetime: this.selectedParty.date,
      seats: null,
      eachPrice: this.selectedParty.price,
      movie: this.selectedMovie.movie_id
    };
    this.cookie.putObject('booking', booking);

    // this.router.navigate(['/booking/seating']);    
  }

  getPartiesAtThisDate(){
    this.partiesService.getParties(this.selectedCinema.location ,this.selectedCinema.name , this.selectedMovie.movie_id , this.date).subscribe((response) =>{
      this.parties = response.data;
      console.log(response.data);

    });
  }
  

}
