import { Component, OnInit } from '@angular/core';
import { FilterCinemaService } from '../../../@services/filter-cinema.service';



@Component({
  selector: 'app-filter-cinema',
  templateUrl: './filter-cinema.component.html',
  styleUrls: ['./filter-cinema.component.css']
})
export class FilterCinemaComponent implements OnInit {
  cinemas;
  searchValue;
  location;
  sorting_item;
  constructor(public FilterCinemaService: FilterCinemaService) { 
    var cinemas:{
      name,number_of_halls,address,company,location
    }
 
  }

  ngOnInit() {
    this.FilterCinemaService.getAllCinemas().subscribe((response) => {
      this.cinemas = response;
    });
      }
      filterBy(){
        if(this.sorting_item == 1){
      this.FilterCinemaService.filterByNumberOfHalls(this.searchValue).subscribe((response) => {
        this.cinemas = response;
      });}
        else if(this.sorting_item == 2){
          this.FilterCinemaService.filterByLocation(this.searchValue).subscribe((response) => {
            this.cinemas = response; 
          });
        }
      
    }
   
    
}
