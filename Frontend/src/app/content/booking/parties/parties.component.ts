import { Component, OnInit } from '@angular/core';
import { PartiesService } from '../../../@services/parties.service';
import {Router, ActivatedRoute, Params} from '@angular/router'

@Component({
  selector: 'app-parties',
  templateUrl: './parties.component.html',
  styleUrls: ['./parties.component.css']
})
export class PartiesComponent implements OnInit {
  parties=[];

  constructor(public partiesService:PartiesService,
    public router : Router,
    public route: ActivatedRoute) { 

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

    this.partiesService.getParties(cinemaName,movieName,date).subscribe((response) =>{
      this.parties = response.data;
      console.log(response.data);

    });
  }

}
