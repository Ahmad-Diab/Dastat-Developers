import { Component, OnInit } from '@angular/core';
import {CinemaInfoService} from '../../../@services/cinema-info.service';
import {Router, ActivatedRoute, Params} from '@angular/router'
import { CinemaslistService } from '../../../@services/cinemaslist.service'
import { CinemasListComponent } from '../cinemas-list/cinemas-list.component'

@Component({
  selector: 'app-cinema-info',
  templateUrl: './cinema-info.component.html',
  styleUrls: ['./cinema-info.component.css']
})
export class CinemaInfoComponent implements OnInit {
  cinema;
   name;
   location;
   moviesInCinema;
   chooseDate;
   


  constructor(public cinemaSerive: CinemaInfoService,
  public router : Router,
  public route: ActivatedRoute) {

    this.route.params.subscribe((params: Params )=> {
      this.name = params['name'];
      this.location = params['location'];
    });

   }
   
  ngOnInit() {
    document.getElementById("moviesTab").click();
    var data = {
     cinema:this.name,
     location:this.location,
     
    }

    
    this.cinemaSerive.getCinemaInfo(data.cinema,data.location).subscribe((response) => {
      this.cinema=response;
    });

    this.cinemaSerive.getMoviesInCinema(data.cinema,data.location).subscribe((response) => {   
      this.moviesInCinema=response;
    });

  }
  filterBy(sorting_item,searchValue){
    if(sorting_item != undefined && searchValue != undefined) this.router.navigate(['cinemas/list',sorting_item,searchValue]);
    else this.router.navigate(['cinemas/list']);
}

}
