import { Component, OnInit } from '@angular/core';
import { SeatingService } from '../../../@services/seating.service';

@Component({
  selector: 'booking-seating',
  templateUrl: './seating.component.html',
  styleUrls: ['./seating.component.css']
})
export class SeatingComponent implements OnInit {

  constructor(public seatingservice: SeatingService) { }

  ngOnInit() {
    this.seatingservice.testing().subscribe((response) => { 
      console.log(response);
    });
  }

}
