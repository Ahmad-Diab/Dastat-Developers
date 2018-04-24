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
  cinematoupdate={ 
      address:undefined,  
      number_of_halls:undefined,  
      is3D: undefined,
      is4D: undefined  ,
      company: undefined ,  
      imagePath: undefined   ,
      imagePath2: undefined  ,   
  }
  AddedCinema=[]; 
  cinemas = [];
  clickedcinema={
    name:undefined,
    location:undefined
  };
  sorting_item;
  searchValue ;
  AddAction;
  UpdateAction;
  is3D = true;
  is4D = true;
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
    this.cinemalistService.getAllCinemas().subscribe((response) => {
      this.cinemas=response;
      console.log(this.cinemas[0].company);
   
    });

  }
  onupdate(){
   // console.log(this.cinematoupdate);
    this.cinemalistService.Update(this.clickedcinema.location,this.clickedcinema.name,this.cinematoupdate).subscribe((response) => {
      console.log("update");
      this.ngOnInit();
   
    });
  }
  ondelete(){
    this.cinemalistService.delete(this.clickedcinema.location,this.clickedcinema.name).subscribe((response) => {
      console.log("delete");
      this.ngOnInit();
      this.clickedcinema.name=undefined;
      this.clickedcinema.location=undefined;
    });
  }
  AddCinema(){
    for(var i = 0;i <8 ; i++){
      if(this.AddedCinema[i] == undefined){
        console.log("FAILLLS");
        return;
      }/*if (i==5 &&(this.AddedCinema[i]!="0")){
           console.log("is3D should be 0 or 1 ");
           return;
      }
      console.log(this.AddedCinema[i]);
      if (i==6&&(this.AddedCinema[i]!="0"||this.AddedCinema[i]!="1")){
        console.log("is4D should be 0 or 1 ");
        return;
      }*/
    }
    console.log(this.AddedCinema[0])
    this.cinemalistService.addCinema(this.AddedCinema).subscribe((response) => {  
    });
     this.ngOnInit();
     this.AddedCinema=[];
}
  toggleAddAction(){
  this.AddAction=!this.AddAction;
  }
  toggleUpdateAction(){
    this.UpdateAction=!this.UpdateAction;
    }
  setupdateinputs(Cinema:any){
    this.clickedcinema.name=Cinema.name;
    this.clickedcinema.location=Cinema.location;
  }

}
