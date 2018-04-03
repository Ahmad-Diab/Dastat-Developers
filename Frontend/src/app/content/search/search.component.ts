import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../@services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  movies = [];
  cinemas = [];
  actors = [];

  constructor(public searchService: SearchService ) {
  }

  ngOnInit() {
    this.searchService.getSearchResult("m").subscribe((response) => {
      this.movies = response.data.Movies;
      this.cinemas = response.data.Cinemas;
      this.actors = response.data.Actors;
    }); 
  }
  

  onSearch(searchKey : String = '') {
    console.log(searchKey);
    this.searchService.getSearchResult(searchKey).subscribe((response) => {
      this.movies = response.data.Movies;
      this.cinemas = response.data.Cinemas;
      this.actors = response.data.Actors;
    });
  }

}

