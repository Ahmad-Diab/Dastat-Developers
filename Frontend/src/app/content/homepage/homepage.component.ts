import { Component, OnInit } from '@angular/core';
import { MovieslistService} from '../../@services/movieslist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  movies = [];
  topMovies = [];

  constructor(public moviesService: MovieslistService ,  private router : Router) { }

  ngOnInit() {
    //this.load();

    this.moviesService.getFeaturedMovies().subscribe((response) => { 
      this.movies = response.data;
      console.log(response);
    });

    this.moviesService.getTopMovies().subscribe((response) => { 
      this.topMovies = response.data;
      console.log(response);
    });
  }

  getMovieInfo(movie){
    window.open('/info/'+movie.movie_id,"_self")
  }
}
