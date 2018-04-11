import { Component, OnInit } from '@angular/core';
import { CinemaslistService } from '../../../@services/cinemaslist.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SelectControlValueAccessor } from '@angular/forms';
import {FormControl} from '@angular/forms';


@Component({
  selector: 'app-cinemas-list',
  templateUrl: './cinemas-list.component.html',
  styleUrls: ['./cinemas-list.component.css']
})
export class CinemasListComponent implements OnInit {
  cinemas = [];
  sorting_item;
  searchValue ;
  locations ;
  is3D = true;
  is4D = true;
  temp;
  constructor(public cinemalistService: CinemaslistService,
  public router: Router, public route: ActivatedRoute) { 

    this.route.params.subscribe((params: Params )=> {
      this.sorting_item = params['sorting_item'];
      this.searchValue = params['searchValue'];
    });
  }

  ngOnInit() {

    this.searchValue = 'All';

    this.cinemalistService.getDistinctLocation().subscribe((response) => {
      this.locations=response;

      console.log(this.locations);
    });
    this.cinemalistService.getAllCinemas().subscribe((response) => {
      this.cinemas=response;
      console.log(this.cinemas);

    });
    console.log(this.searchValue);

  }
  
filter(){
  var cinema3d = 0;
  var cinema4d = 0;
  if(this.is3D) cinema3d = 1;
  if(this.is4D) cinema4d = 1;
  this.cinemalistService.filterByLocation(this.searchValue,cinema3d,cinema4d).subscribe((response) => {
    this.cinemas = response; 
    console.log(response);

  });
}

  cinemanav(cinema) {
    this.router.navigate(['/cinemas', cinema.name, cinema.location]);
  }

  

}
