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
  size: any;
  movies=[];
  p : number = 1;
  genre = "No filter";
  rateFilter;
  dateFilter;
  constructor(public movieslistService: MovieslistService, public searchService: SearchService,  private router : Router ,
  public cookie : CookieService,) { 
  }
  
  ngOnInit() {
    this.filterByAll();
  }
  filterByAll(){
    this.movieslistService.filterByAll(this.p,this.p * 5,this.genre,this.dateFilter,this.rateFilter).subscribe((response)=>{
      this.movies=response.data;
      this.size=response.totalCount;
      console.log(response);
    })
  } 
/*
  SpecifySortingFilter(){
    switch(this.sortingFilter){
      case "Not sorted" : this.ngOnInit();break;
      case "High Rates" : this.viewHighRate();break;
      case "Low Rates" : this.viewLowRate();break;
      case "Latest" : this.viewLatest();break;
      case "Oldest" : this.viewOldest();break;
    }
  }
  SpecifyGenre(){
    switch(this.genre){
      case "No filter" : this.ngOnInit();break;
      case "Action" : this.viewAction();break;
      case "Adventure" : this.viewAdventure();break;
      case "Biography" : this.viewBio();break;
      case "Comedy" : this.viewComedy();break;
      case "Drama" : this.viewDrama();break;
      case "Horror" : this.viewHorror();break;
      case "Thriller" : this.viewThriller();break;
       
    }
  }
    //----- HERE IS THE FUNCTIONS YOU CALL ON CLICK
    //------ DO NOT FORGET TO IMPLEMENT IT FIRST IN THE SERVICES----
  
GoToReservation(movie){

  this.cookie.putObject('movie' , movie);
}    
viewHighRate(){
  this.movieslistService.geHighRateMovies(this.genre).subscribe((response)=>{
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
  this.movieslistService.getLowRate(this.genre).subscribe((response)=>{
    this.movies=response;
    console.log(response);
    
  });
}

viewLatest(){
  this.movieslistService.getLatest(this.genre).subscribe((response)=>{
    this.movies=response;
    console.log(response);
    
  });
}

viewOldest(){

  this.movieslistService.getOldest(this.genre).subscribe((response)=>{
    this.movies=response;
    console.log(response);
    
  });
}

viewAction(){

  this.movieslistService.getAction(this.sortingFilter).subscribe((response)=>{
    this.movies=response;
    console.log(response);
    
  });
}

viewAdventure(){

  this.movieslistService.getAdventure(this.sortingFilter).subscribe((response)=>{
    this.movies=response;
    console.log(response);
    
  });
}

viewComedy(){

  this.movieslistService.getComedy(this.sortingFilter).subscribe((response)=>{
    this.movies=response;
    console.log(response);
    
  });
}

viewDrama(){

  this.movieslistService.getDrama(this.sortingFilter).subscribe((response)=>{
    this.movies=response;
    console.log(response);
    
  });
}


viewHorror(){

  this.movieslistService.getHorror(this.sortingFilter).subscribe((response)=>{
    this.movies=response;
    console.log(response);
    
  });
}

viewThriller(){

  this.movieslistService.getThriller(this.sortingFilter).subscribe((response)=>{
    this.movies=response;
    console.log(response);
    
  });
}
viewBio(){

  this.movieslistService.getBio(this.sortingFilter).subscribe((response)=>{
    this.movies=response;
    console.log(response);
    
  });
}*/

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
