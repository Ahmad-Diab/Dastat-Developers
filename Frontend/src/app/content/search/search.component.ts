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

  search;
  
  constructor(public searchService: SearchService ) {
  }

  ngOnInit() {
    this.search = "";
    this.searchService.getSearchResult("m").subscribe((response) => {
      this.movies = response.data.Movies;
      this.cinemas = response.data.Cinemas;
      this.actors = response.data.Actors;
      let btn = document.getElementById("searchButton");
      btn.addEventListener("hhee", (e:Event) => this.getSearchResults());
    });
    
  }
 getSearchResults(){
   console.log("hobaa");
  this.searchService.getSearchResult(document.getElementById("searchText").nodeValue).subscribe((response) => {
    this.movies = response.data.Movies;
    this.cinemas = response.data.Cinemas;
    this.actors = response.data.Actors;
  });
}
  

  onSearch(searchKey : String) {
    this.searchService.getSearchResult(searchKey).subscribe((response) => {
      this.movies = response.data.Movies;
      this.cinemas = response.data.Cinemas;
      this.actors = response.data.Actors;
    });
    console.log(searchKey);
  }

}

