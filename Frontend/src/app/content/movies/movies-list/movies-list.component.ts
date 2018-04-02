import { Component, OnInit } from '@angular/core';
import { MovieslistService } from '../../../@services/movieslist.service';
@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies=[];


  constructor(public movieslistService: MovieslistService) { 
    
  }

  ngOnInit() {
 /*    this.movieslistService.getCurrentMovies().subscribe((response) => {
      this.movies=response.data;
      console.log(this.movies);
      
    });  */
  }
    //----- HERE IS THE FUNCTIONS YOU CALL ON CLICK
    //------ DO NOT FORGET TO IMPLEMENT IT FIRST IN THE SERVICES----
  
viewHighRate(){
  this.movieslistService.geHighRateMovies().subscribe((response)=>{
    this.movies=response;
    console.log(response);
    
  });
}



}