import { Component, OnInit } from '@angular/core';
import { MoviesInHallsService } from '../@services/movies-in-halls.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-movies-in-halls',
  templateUrl: './movies-in-halls.component.html',
  styleUrls: ['./movies-in-halls.component.scss']
})

export class MoviesInHallsComponent implements OnInit {

  constructor(public MoviesInHallsService : MoviesInHallsService , private modalService: NgbModal,
    public router : Router,
    public cookie :CookieService) { }
    
    movie = []; //will contain all data about selected movie and hall
    halls = []; //will contain all halls in selected cinema
    CinemaMovies = []; //will contain all movies currently screening in selected cinema

    selectedMovie; //the selected movie
  
  
    //testing
    cinema_name = "Mayo Movies";
    cinema_location = "9th of Mayo";
    username = "cinema";
    password = "lailalaila123";
 
    
  ngOnInit() {

      //inset dummy values in cookie for testing
      this.cookie.put('username', this.username); //admin username
      this.cookie.put('cinema_name', this.cinema_name); //selected cinema name
      this.cookie.put('cinema_location', this.cinema_location); //selected cinema location

      //retrieve all movies in selected cinema
      this.MoviesInHallsService.cinemaMovies(this.cookie.get('cinema_name') , this.cookie.get('cinema_location')).subscribe((response) => {
        this.CinemaMovies = response.data;
      });

      //retrieve all halls in selected cinema
      this.MoviesInHallsService.cinemaHalls(this.cookie.get('cinema_name') , this.cookie.get('cinema_location')).subscribe((response) => {
        this.halls = response.data;
        console.log(response.data);
      });
      
    }

    //method to submit all data about selected movie and hall in cookie
    submitMovie(){
      this.MoviesInHallsService.getMovieDetails(this.selectedMovie, this.cookie.get('cinema_name') , this.cookie.get('cinema_location')).subscribe((response) => {
        this.movie = response.data;
      });
      this.cookie.putObject('movie' , this.movie);
      console.log(this.movie);
  
      this.router.navigate(['/AdminBooking/makeReservation']);
    }
  

  }




 





  