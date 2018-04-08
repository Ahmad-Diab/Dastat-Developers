import { Component, OnInit } from '@angular/core';
import { MovieslistService} from '../../@services/movieslist.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  movies = [];
  topMovies = [];

  constructor(public moviesService: MovieslistService) { }

  ngOnInit() {
    //this.load();
    this.moviesService.getFeaturedMovies().subscribe((response) => { 
      this.movies = response;
      console.log(response);
    });

    this.moviesService.getTopMovies().subscribe((response) => { 
      this.topMovies = response;
      console.log(response);
    });
  }

}
