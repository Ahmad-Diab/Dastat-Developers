import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../@services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  movies = [];    // holds the movies that to be displayed in search
  cinemas = [];   // holds the mcinemas that to be displayed in search
  actors = [];    // holds the actors that to be displayed in search

  constructor(public searchService: SearchService, private router: Router ) {
  }

  ngOnInit() {
    this.searchService.getSearchResult("").subscribe((response) => {
      this.movies = response.data.Movies;
      this.cinemas = response.data.Cinemas;
      this.actors = response.data.Actors;
    }); 
  }
  
  /**
   * Search and find results of movies, cinemas, actors that are matching a given keyword in any of the table columns that matter
   * @param searchKey The keyword used to search with
   */
  onSearch(searchKey : String = '') {
    console.log(searchKey);
    this.searchService.getSearchResult(searchKey).subscribe((response) => {
      this.movies = response.data.Movies;
      this.cinemas = response.data.Cinemas;
      this.actors = response.data.Actors;
    });
  }

  /**
   * navigates to movie info
   * @param movie The movie that the info will be about
   */
  getMovieInfo(movie){
    this.router.navigate(['info', movie.movie_id]);
  }

  getCinemaInfo(cinema){
    this.router.navigate(['cinemas', cinema.name, cinema.location]);
  }

}

