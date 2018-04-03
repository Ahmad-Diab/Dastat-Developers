import { Component, OnInit } from '@angular/core';
import {CinemaInfoService} from '../../../@services/cinema-info.service';
import {Router, ActivatedRoute, Params} from '@angular/router'


@Component({
  selector: 'app-cinema-info',
  templateUrl: './cinema-info.component.html',
  styleUrls: ['./cinema-info.component.css']
})
export class CinemaInfoComponent implements OnInit {
  
  cinema;
  name;
  location;

  constructor(public cinemaSerive: CinemaInfoService, 
  public router : Router,
  public route: ActivatedRoute) {

    this.route.params.subscribe((params: Params )=> {
      this.name = params['name'];
      this.location = params['location'];
    });

   }

  ngOnInit() {
    var data = {
     cinema:this.name,
     location:this.location,
    }

    this.cinemaSerive.getCinemaInfo(data.cinema,data.location).subscribe((response) => {
      
      this.cinema=response;
    });
  }

}
