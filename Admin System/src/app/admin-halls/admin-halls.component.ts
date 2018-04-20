import { Component, OnInit } from '@angular/core';
import { HallsService } from '../@services/halls.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-admin-halls',
  templateUrl: './admin-halls.component.html',
  styleUrls: ['./admin-halls.component.scss']
})
export class AdminHallsComponent implements OnInit {

  constructor(public hallService : HallsService , private modalService: NgbModal,
  public cookie :CookieService) { }
  
  halls=[];
  cinemas=[];
  selectedCinemaMovies=[];

  selectedMovie;
  selectedCinema;
  selectedHall;

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
    this.hallService.getCinemasForAdminUser(this.cookie.get('username')).subscribe((response) => {
      this.cinemas = response.data;
      console.log(this.cinemas);
    })

  }

  getHalls(){
    
   //console.log(this.selectedCinema);   
    
    this.getMovies();
    
    this.hallService.getHallsForCinema(this.selectedCinema).subscribe((response) => {
      this.halls = response.data;
      console.log(response.data);
      //console.log(this.halls);
    });
    //console.log(this.editMode);
    
  }

  getMovies(){
    this.hallService.getAlltMoviesInCinemaForAdmin(this.selectedCinema.cinema_name , this.selectedCinema.cinema_location).subscribe((response) => {
      this.selectedCinemaMovies = response.data;
      //console.log(response.data);
      //console.log(this.halls);
    });
  }

  deleteMovieFromHall(){

    //console.log(this.selectedCinema);
    var data = {

      username: this.cookie.get('username'),
      cinema_name: this.selectedCinema.cinema_name,
      cinema_location: this.selectedCinema.cinema_location,
      hall_number: this.selectedHall.hall_number,
      movie_id: this.selectedHall.movie
      
    }
    //console.log(data);
    this.hallService.deleteMovieFromHall(data).subscribe((response) => {
      //console.log(response);
      this.getHalls();
    });
  }

  assignMovieToHall(){

    //console.log(this.selectedCinema);
    var data = {
      username: this.cookie.get('username'),
      cinema_name: this.selectedCinema.cinema_name,
      cinema_location: this.selectedCinema.cinema_location,
      hall_number: this.selectedHall.hall_number,
      movie_id: this.selectedMovie.movie_id
    }

    //console.log(data);
    this.hallService.assignMovieToHall(data).subscribe((response) => {
      //console.log(response);
      this.getHalls();
    });

    this.selectedHall = null;
  }





  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      
      if(result === 'Delete'){
        this.deleteMovieFromHall();
      }
      
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
