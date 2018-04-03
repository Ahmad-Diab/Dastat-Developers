import { Component, OnInit } from '@angular/core';
import { MovieInfoService } from '../../../@services/movie-info.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {
movie;
  constructor(public MovieInfoService: MovieInfoService) { 

  }

ngOnInit(){
  this.MovieInfoService.getMovieInfo("1").subscribe((response)=>{
    this.movie=response.data[0];
    console.log(response.data[0]);
  });
}
}
