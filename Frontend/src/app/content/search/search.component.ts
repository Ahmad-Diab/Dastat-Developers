import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  movies = [];
  cinemas = [];
  actors = [];
  
  constructor() { public searchService: SearchService }

  ngOnInit() {
    this.searchService.getSearch().subscribe((response) => {
      this.movies = response.data.Movies;
      this.cinemas = response.data.Cinemas;
      this.actors = response.data.Actors;
    });
  }

}
