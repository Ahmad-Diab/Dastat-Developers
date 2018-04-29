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
  p : number = 0;
  size : number;
  

  constructor(public userService:UserService, public cookie : CookieService,) { }


  ngOnInit() {
    this.usersame=this.cookie.get('username');
    this.userService.getBookingDetails(this.usersame,this.p * 5,(this.p * 5) + 4).subscribe((response) => {
      this.size=response.data.totalCount;
      this.tickets=response.data.results;
      console.log(this.tickets);
      
    });
  }

}
