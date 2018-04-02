import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MoviesListComponent implements OnInit {

  constructor(public moviesInfoService: MoviesInfoService) { 
    
  }

  ngOnInit() {
    this.moviesInfoService.getCurrentMovies().subscribe((response) => {
      this.movies=response.data;
      console.log(this.movies);
      
    });
  }

}