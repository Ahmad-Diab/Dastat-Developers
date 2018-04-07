import { Component, OnInit } from '@angular/core';
import { CinemaslistService } from '../../../@services/cinemaslist.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-cinemas-list',
  templateUrl: './cinemas-list.component.html',
  styleUrls: ['./cinemas-list.component.css']
})
export class CinemasListComponent implements OnInit {
  cinemas;
  sorting_item;
  searchValue;
  
  constructor(public cinemalistService: CinemaslistService,
  public router: Router, public route: ActivatedRoute) { 

    this.route.params.subscribe((params: Params )=> {
      this.sorting_item = params['sorting_item'];
      this.searchValue = params['searchValue'];
    });
  }

  ngOnInit() {
    this.cinemalistService.getAllCinemas().subscribe((response) => {
      this.cinemas=response;
     this.filterBy(this.sorting_item,this.searchValue);
    });
  }
  filterBy(sorting_item,searchValue){
    
    if(sorting_item == 1){ //Filtering by number of halls
  this.cinemalistService.filterByNumberOfHalls(searchValue).subscribe((response) => {
    this.cinemas = response;
  });}
    else if(sorting_item == 2){ //Filtering ny location
      this.cinemalistService.filterByLocation(searchValue).subscribe((response) => {
        this.cinemas = response; 
      });
    }

  
}

  cinemanav(cinema) {
    this.router.navigate(['/cinemas', cinema.name, cinema.location]);
  }

}
