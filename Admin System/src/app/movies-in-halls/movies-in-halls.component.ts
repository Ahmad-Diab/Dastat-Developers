import { Component, OnInit } from '@angular/core';
import { MoviesInHallsService } from '../@services/movies-in-halls.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-movies-in-halls',
  templateUrl: './movies-in-halls.component.html',
  styleUrls: ['./movies-in-halls.component.scss']
})

export class MoviesInHallsComponent implements OnInit {

  constructor(public MoviesInHallsService : MoviesInHallsService , private modalService: NgbModal,
    public cookie :CookieService) { }
    
    halls=[];
    cinemas=[];
    selectedCinemaMovies=[];
  
    selectedMovie;
    selectedCinema;
  
    editMode: boolean;
    closeResult: string;
  
  
    //==========FOR TEST===============
    username = "cinema";
    password = "lailalaila123";
    //=================================  
    
  ngOnInit() {

    //======FOR TEST=======
      this.cookie.put('username', this.username);
    //=======FOR TEST======
      this.editMode = false;
      this.MoviesInHallsService.getCinemasForAdminUser(this.cookie.get('username')).subscribe((response) => {
        this.cinemas = response.data;
        console.log(this.cinemas);
      })
  
    }

    getHalls(){
  
       
       this.getMovies();
       
       this.MoviesInHallsService.getHallsForCinema(this.selectedCinema).subscribe((response) => {
         this.halls = response.data;
         console.log(response.data);
       });
       
       
     }
   
     getMovies(){
       this.MoviesInHallsService.getAlltMoviesInCinemaForAdmin(this.selectedCinema.cinema_name , this.selectedCinema.cinema_location).subscribe((response) => {
         this.selectedCinemaMovies = response.data;
       });
     }

  
  }




 





  