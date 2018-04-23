import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../@services/user.service';
import { CookieService } from 'angular2-cookie/core';



@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {
  tickets=[];
  usersame;
  

  constructor(public userService:UserService, public cookie : CookieService,) { }


  ngOnInit() {
    this.usersame=this.cookie.get('username');
    this.userService.getBookingDetails(this.usersame).subscribe((response) => {
      this.tickets=response.data;
      console.log(this.tickets);
      
    });
  }

}
