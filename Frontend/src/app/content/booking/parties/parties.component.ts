import { Component, OnInit } from '@angular/core';
import { PartiesService } from '../../../@services/parties.service';
import {Router, ActivatedRoute, Params} from '@angular/router'
import { CookieService } from 'angular2-cookie/core';

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css']
})
export class PartiesComponent implements OnInit {
  parties=[];
  cinema;
  movie;
  date;

  constructor(public partiesService:PartiesService,
    public router : Router,
    public route: ActivatedRoute,
    public cookie : CookieService) { 

  //   this.route.params.subscribe((params: Params )=> {
  //   this.cinemaName = params['name'];
  //   this.movieName = params['location'];
  //   this.date = params['date'];
  // });
}

  // cinemaName;
  // movieName;
  // date;

  ngOnInit() {
    var cinemaName = "Mayo Movies",
        movieName = "13",
        date = "2018-4-12";

    this.cinema = this.cookie.getObject('cinema');
    this.movie = this.cookie.getObject('movie');

    
  }

  getPartiesAtThisDate(){
    this.partiesService.getParties(this.cinema.location ,this.cinema.name , this.movie.movie_id , this.date).subscribe((response) =>{
      this.parties = response.data;
      console.log(response.data);

    });
  }
  

}
