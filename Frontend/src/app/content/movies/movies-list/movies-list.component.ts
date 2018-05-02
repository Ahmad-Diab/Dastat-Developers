import { Component, OnInit } from '@angular/core';
import { MovieslistService } from '../../../@services/movieslist.service';
import { SearchService } from '../../../@services/search.service';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/core';
@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  movies=[];

  constructor(public movieslistService: MovieslistService, public searchService: SearchService,  private router : Router ,
  public cookie : CookieService,) { 
  }
  
  ngOnInit() {

    this.viewMovies();
  }
    //----- HERE IS THE FUNCTIONS YOU CALL ON CLICK
    //------ DO NOT FORGET TO IMPLEMENT IT FIRST IN THE SERVICES----
  
GoToReservation(movie){

  this.cookie.putObject('movie' , movie);
}

Book_or_Signin(movie){
  if (this.cookie.get("username")){
    this.cookie.putObject('movie' , movie);
    window.open('booking/cinemas',"_self");
  }
  else{
    window.open('/signin',"_self")
    this.ngOnInit();
  }
}
    
viewHighRate(){
  this.movieslistService.geHighRateMovies().subscribe((response)=>{
    this.movies=response;
    console.log(response);
    
  });
}

viewMovies(){
  this.movieslistService.getMovies().subscribe((response)=>{
    this.movies=response;
    console.log(response);
    
  });
}

viewLowRate(){
  this.movieslistService.getLowRate().subscribe((response)=>{
    this.movies=response;
    console.log(response);
    
  });
}

viewLatest(){
  this.movieslistService.getLatest().subscribe((response)=>{
    this.movies=response;
    console.log(response);
    
  });
}

viewOldest(){

  this.movieslistService.getOldest().subscribe((response)=>{
    this.movies=response;
    console.log(response);
    
  });
}

viewAction(){

  this.movieslistService.getAction().subscribe((response)=>{
    this.movies=response;
    console.log(response);
    
  });
}

viewAdventure(){

  this.movieslistService.getAdventure().subscribe((response)=>{
    this.movies=response;
    console.log(response);
    
  });
}

viewComedy(){

  this.movieslistService.getComedy().subscribe((response)=>{
    this.movies=response;
    console.log(response);
    
  });
}

viewDrama(){

  this.movieslistService.getDrama().subscribe((response)=>{
    this.movies=response;
    console.log(response);
    
  });
}


viewHorror(){

  this.movieslistService.getHorror().subscribe((response)=>{
    this.movies=response;
    console.log(response);
    
  });
}

viewThriller(){

  this.movieslistService.getThriller().subscribe((response)=>{
    this.movies=response;
    console.log(response);
    
  });
}
viewBio(){

  this.movieslistService.getBio().subscribe((response)=>{
    this.movies=response;
    console.log(response);
    
  });
}

onSearch(searchKey : String = '') {
  console.log(searchKey);
  this.searchService.getSearchResult(searchKey).subscribe((response) => {
    this.movies = response.data.Movies;
  });
}
getMovieInfo(movie){
  this.router.navigate(['info',movie.movie_id]);
}

}