import { Component, OnInit } from '@angular/core';
import { CinemaslistService } from '../../@services/cinemaslist.service'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SelectControlValueAccessor } from '@angular/forms';
import { SearchService } from '../../@services/search.service';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-admincinemas',
  templateUrl: './admincinemas.component.html',
  styleUrls: ['./admincinemas.component.scss']
})
export class AdmincinemasComponent implements OnInit {

  cinemas = [];
  clickedcinema="";
  sorting_item;
  searchValue ;
  locations ;
  AddAction;
  UpdateAction;
  is3D = true;
  is4D = true;
  AddedCinema; 
  constructor(public cinemalistService: CinemaslistService,
  public router: Router, public route: ActivatedRoute , public searchService : SearchService) { 

    this.route.params.subscribe((params: Params )=> {
      this.sorting_item = params['sorting_item'];
      this.searchValue = params['searchValue'];
    });
  }

  onSearch(searchKey : String = '') {
    console.log(searchKey);
    this.searchService.getSearchResult(searchKey).subscribe((response) => {
      this.cinemas = response.data.Cinemas;
    });
  }
  ngOnInit() {

    this.searchValue = 'All';
    this.AddedCinema = [];
    this.cinemalistService.getDistinctLocation().subscribe((response) => {
      this.locations=response;
    });
    this.cinemalistService.getAllCinemas().subscribe((response) => {
      this.cinemas=response;
      console.log(this.cinemas[0].company);
   
    });

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

  toggleAddAction(){
  this.AddAction=!this.AddAction;
  }
  toggleUpdateAction(){
    this.UpdateAction=!this.UpdateAction;
    }
  setupdateinputs(Cinema:any){
    this.clickedcinema=Cinema;
  }
  AddCinema(){
    for(var i = 0;i <8 ; i++){
      if(this.AddedCinema[i] == undefined){
        console.log("FAILLLS");
        return;
      }
    }
    console.log(this.AddedCinema[0])
    this.cinemalistService.addCinema(this.AddedCinema).subscribe((response) => {  
    });
  }

}
