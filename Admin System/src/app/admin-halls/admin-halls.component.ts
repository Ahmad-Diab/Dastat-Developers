import { Component, OnInit } from '@angular/core';
import { HallsService } from '../@services/halls.service';
@Component({
  selector: 'app-admin-halls',
  templateUrl: './admin-halls.component.html',
  styleUrls: ['./admin-halls.component.scss']
})
export class AdminHallsComponent implements OnInit {

  constructor(public hallService : HallsService) { }
  
  halls=[];
  cinemas=[ {name : "Mayo Movies", location : "9th of Mayo"} 
  ];

  username = "Laila_Khaled";
  password = "lailalaila123";

  selectedCinema;

  ngOnInit() {
    
  }

  setCinema(cinema){
    this.selectedCinema = cinema;
    console.log(this.selectedCinema);
    this.hallService.getHallsForCinema(cinema).subscribe((response) => {
      this.halls = response.data;
      console.log(response.data);
      console.log(this.halls);
    });
    
  }

}
