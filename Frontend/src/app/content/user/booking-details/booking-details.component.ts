import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../@services/user.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  tickets=[];

  constructor(public userService:UserService) { }

  ngOnInit() {
    this.userService.getBookingDetails("Hamza_Namira").subscribe((response) => {
      this.tickets=response.data;
      console.log(this.tickets);
      
    });
  }

}
