import { Component, OnInit } from '@angular/core';
import { MovieInfoService } from '../../../@services/movie-info.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {
movie;
  constructor(public MovieInfoService: MovieInfoService, private route : ActivatedRoute ) { 

  }

ngOnInit(){

  this.route.params.subscribe( params => this.movie = params['movie_id']);
  console.log(this.movie);
  this.MovieInfoService.getMovieInfo(this.movie).subscribe((response)=>{
    this.movie=response.data[0];
    console.log(response.data[0]);
  });
}
}
