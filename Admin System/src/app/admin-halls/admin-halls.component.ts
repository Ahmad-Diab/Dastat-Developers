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
  selectedCinemaHallsMovies=[];

  selectedMovie;
  selectedCinema;
  selectedHall;

  editMode: boolean;
  closeResult: string;

  errorMessage: string;
  successMessage: string;
  warningMessage: string;

  //==========FOR TEST===============
  username;
  password = "lailalaila123";
  //=================================  

  

  ngOnInit() {

    var auth = this.cookie.getObject('auth')
    this.username = auth['username'];
    console.log(this.username);
    this.editMode = false;
    this.hallService.getCinemasForAdminUser(this.username).subscribe((response) => {
      this.cinemas = response.data;

      if(response.err == null && response.data == [])
        this.warningMessage = response.msg;
      else if(response.err == null && response.data != [])
        this.successMessage = response.msg;
      else 
        this.errorMessage = response.msg;
    })

  }

  getHalls(){
    
   //console.log(this.selectedCinema);   
    
    this.getMovies();
    
    this.hallService.getHallsForCinema(this.selectedCinema).subscribe((response) => {
      this.halls = response.data;
      
      if(response.err == null && response.data == [])
        this.warningMessage = response.msg;
      else if(response.err == null && response.data != [])
        this.successMessage = response.msg;
      else 
        this.errorMessage = response.msg;

      console.log(response.data);
      //console.log(this.halls);
    });
    //console.log(this.editMode);
    
  }

  getMovies(){
    this.hallService.getAlltMoviesInCinemaForAdmin(this.selectedCinema.cinema_name , this.selectedCinema.cinema_location).subscribe((response) => {
      this.selectedCinemaMovies = response.data;

      if(response.err == null && response.data == [])
        this.warningMessage = response.msg;
      else if(response.err == null && response.data != [])
        this.successMessage = response.msg;
      else 
        this.errorMessage = response.msg;

      //console.log(response.data);
      //console.log(this.halls);
    });
  }

  deleteMovieFromHall(){

    //console.log(this.selectedCinema);
    var data = {

      username: this.username,
      cinema_name: this.selectedCinema.cinema_name,
      cinema_location: this.selectedCinema.cinema_location,
      hall_number: this.selectedHall.hall_number,
      movie_id: this.selectedHall.movie      
    }
    //console.log(data);
    this.hallService.deleteMovieFromHall(data).subscribe((response) => {
      //console.log(response);

      if(response.err == null && response.data == [])
        this.warningMessage = response.msg;
      else if(response.err == null && response.data != [])
        this.successMessage = response.msg;
      else 
        this.errorMessage = response.msg;

      this.getHalls();
    });
  }

  assignMovieToHall(){

    //console.log(this.selectedCinema);
    var data = {

      username: this.username,
      cinema_name: this.selectedCinema.cinema_name,
      cinema_location: this.selectedCinema.cinema_location,
      hall_number: this.selectedHall.hall_number,
      movie_id: this.selectedMovie.movie_id
    }

    //console.log(data);
    this.hallService.assignMovieToHall(data).subscribe((response) => {
      //console.log(response);

      if(response.err == null && response.data == [])
        this.warningMessage = response.msg;
      else if(response.err == null && response.data != [])
        this.successMessage = response.msg;
      else 
        this.errorMessage = response.msg;

      this.getHalls();
    });

    this.selectedHall = null;
  }

  viewMoviesInHalls(){
    var data = {
      username: this.username,
      cinema_name: this.selectedCinema.cinema_name,
      cinema_location: this.selectedCinema.cinema_location
    }
    this.hallService.viewMoviesInHalls(this.username , this.selectedCinema.cinema_name , this.selectedCinema.cinema_location).subscribe((response)=>{
      this.selectedCinemaHallsMovies = response.data;

      if(response.err == null && response.data == [])
        this.warningMessage = response.msg;
      else if(response.err == null && response.data != [])
        this.successMessage = response.msg;
      else 
        this.errorMessage = response.msg;
        
      console.log(response.data);
    });

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
