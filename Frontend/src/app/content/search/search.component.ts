import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../@services/search.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  movies = [];
  actors = [];
  cinemas = [];
  constructor(public searchService: SearchService) { }

  ngOnInit() {
    this.searchService.get().subscribe((response) => {
      this.movies=response.data;
      console.log(this.movies);
    });
  }

}
