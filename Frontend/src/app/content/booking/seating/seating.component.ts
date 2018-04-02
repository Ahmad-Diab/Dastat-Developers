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
  seats: any;
  selected = [];

  constructor(public cookie: CookieService,
    public seatingservice: SeatingService) { }

  ngOnInit() {
    var booking = {
      cinema_name: 'Point 90',
      cinema_location: 'New Cairo',
      hall_number: '1',
      datetime: '2018-04-01 13:00:00',
      seats: null
    }

    this.cookie.putObject('booking', booking);

    var data = this.cookie.getObject('booking');

    this.seatingservice.view(data).subscribe((response) => {
      var fetched = response.layout.encoded.replace(/\\/g, '');
      this.layout = JSON.parse(fetched);
      this.seats = response.seats;
    });

    
  }

  letter(index: number) {
    var ascii = 65;
    return String.fromCharCode(index + ascii);
  }

  booked(seat: string) {
    for(var i = 0; i < this.seats.length; i++) 
      if(this.seats[i].seat_number == seat)
        return true;
    return false;
  }

  select(seat: string) {
    for(var i = 0; i < this.seats.length; i++)
      if(this.seats[i].seat_number.includes(seat))
        return;

    if(this.selected.includes(seat)){
      var index = this.selected.indexOf(seat);
      this.selected.splice( index, 1 );
    }
    else 
      this.selected.push(seat);

    console.log(this.selected);
  }

  submit() {
    var booking = this.cookie.getObject('booking');
    booking.seats = this.selected;
    
    this.cookie.putObject('booking', booking);

    console.log(this.cookie.getObject('booking'))
  }

  createJSON(seats: Number[][]) {
    var ascii = 65;
    var letter = 'A';
    var jsonObj = [];
    var marginFlag: boolean = false;
    for (var i = 0; i < seats.length; i++) {
      var object: rowObj = new rowObj();
      object.margin = marginFlag;
      marginFlag = false;
      var row = [];
      var margin = seats[i].length;
      for (var j = 0; j < seats[i].length; j++) {
        if (seats[i][j]) {
          row.push({ seat: { number: letter + '' + (j + 1) } });
        } else {
          row.push("offset");
          margin--;
        }
      }
      if (margin === 0) {
        marginFlag = true;
      } else {
        object.row = row;
        jsonObj.push(object);
        letter = String.fromCharCode(++ascii);
      }
    }
    // console.log(jsonObj);

    var json = JSON.stringify(jsonObj);
    console.log(json);
  }

}


export class rowObj {
  margin: boolean;
  row: any[]
}

export class Booking {
  cinema_name: string;
  cinema_location: string;
  hall_number: string;
  datetime: string;
  seats: string;
}