import { Component, OnInit } from '@angular/core';
import { MoviesInHallsService } from '../@services/movies-in-halls.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {Router, ActivatedRoute} from '@angular/router';
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
    
    halls=[];
    selectedCinemaMovies=[];
    cinemas=[];
    movie = [];

    selectedCinema;
    selectedMovie;
  
    editMode: boolean;
    closeResult: string;
  
  
    //==========FOR TEST===============
    cinema_name = "Mayo Movies";
    cinema_location = "9th of Mayo";
    username = "cinema";
    password = "lailalaila123";
    //=================================  
    
  ngOnInit() {

    //======FOR TEST=======
      this.cookie.put('username', this.username);
      this.cookie.put('cinema_name', this.cinema_name);
      this.cookie.put('cinema_location', this.cinema_location);
    //=======FOR TEST======
      this.MoviesInHallsService.getAlltMoviesInCinemaForAdmin(this.cookie.get('cinema_name') , this.cookie.get('cinema_location')).subscribe((response) => {
        this.selectedCinemaMovies = response.data;
      });
      this.MoviesInHallsService.getHallsForCinema(this.cookie.get('cinema_name') , this.cookie.get('cinema_location')).subscribe((response) => {
        this.halls = response.data;
        console.log(response.data);
      });
      
    }

    submitMovie(){
      this.MoviesInHallsService.getMovieDetails(this.selectedMovie, this.cookie.get('cinema_name') , this.cookie.get('cinema_location')).subscribe((response) => {
        this.movie = response.data;
      });
      this.cookie.putObject('movie' , this.movie);
      console.log(this.movie);
  
      this.router.navigate(['/AdminBooking/makeReservation']);
    }
  

  }




 





  