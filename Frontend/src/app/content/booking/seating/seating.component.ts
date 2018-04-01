import { Component, OnInit } from '@angular/core';
import { SeatingService } from '../../../@services/seating.service';
import { Ticket } from '../../../@objects/ticket';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'booking-seating',
  templateUrl: './seating.component.html',
  styleUrls: ['./seating.component.css']
})
export class SeatingComponent implements OnInit {

  tickets: Ticket[];
  layout: any;

  constructor(public cookie: CookieService,
    public seatingservice: SeatingService) { }

  ngOnInit() {

    var booking = {
      cinema_name: 'Point 90',
      cinema_location: 'New Cairo',
      hall_number: '1',
      datetime: '2018-04-01 13:00:00'
    }

    this.cookie.putObject('booking', booking);

    var data = this.cookie.getObject('booking');

    this.seatingservice.view(data).subscribe((response) => { 
      console.log(response);
    });
  }

}
