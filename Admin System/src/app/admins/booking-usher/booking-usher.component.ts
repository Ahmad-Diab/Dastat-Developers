import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { throttle } from '@swimlane/ngx-charts/release/utils';
import { AdminService } from '../../@services/adminService.service';
@Component({
  selector: 'app-edit',
  templateUrl: './booking-usher.component.html',
  styleUrls: ['./booking-usher.component.scss']
})
export class BookingUsher implements OnInit {
  cinema_name: string;
  //uname: string;

  editing = {};
  rows = [];

  constructor(public adminService: AdminService, private router : Router, public cookie : CookieService, private route : ActivatedRoute) { }
  ngOnInit() {
    /*var data = {
      uname: this.cookie.getObject('auth')['username']
    }
    console.log(data);*/
    this.adminService.getBookingUshers().subscribe((response)=>{
      this.rows = response;
      console.log(response);
    });
  }
  updateValue(event, cell, cellValue, row) {
    var data = {
      "username":row.username,
      [cell]:event.target.value,
    }
    console.log(data);
    this.adminService.editBookingUsher(data).subscribe((response)=>{
      console.log(response);
      this.ngOnInit();
    });
  }
  deleteRow(event, cell, cellValue, row) {
    var data = {
      "username":row.username,
    }
    this.adminService.deleteBookingUsher(data).subscribe((response)=>{
      console.log(response);
      this.ngOnInit();
    });
  }
  updateFilter(event) {
    const val = event.target.value;
    var data = {
      cinema_name: val
    }
    this.adminService.getBookingUsher(data).subscribe((response)=>{
      this.rows=response;
    });
  }
}