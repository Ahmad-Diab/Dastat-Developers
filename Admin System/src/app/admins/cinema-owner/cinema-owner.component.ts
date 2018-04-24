import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { throttle } from '@swimlane/ngx-charts/release/utils';
import { AdminService } from '../../@services/adminService.service';

@Component({
  selector: 'app-cinema-owner',
  templateUrl: './cinema-owner.component.html',
  styleUrls: ['./cinema-owner.component.scss']
})
export class CinemaOwnerComponent implements OnInit {

  cinema_name: string;
  editing = {};
  rows = [];

  constructor(public adminService: AdminService, private router : Router, public cookie : CookieService, private route : ActivatedRoute) { }
  ngOnInit() {
    this.adminService.getCinemaOwners().subscribe((response)=>{
      this.rows = response;
    });
  }
  updateValue(event, cell, cellValue, row) {
    var r = cell;
    var data = {
      "username":row.username,
      [cell]:event.target.value
    }
    console.log(data);
    this.adminService.editCinemaOwner(data).subscribe((response)=>{
      console.log(response);
      this.ngOnInit();
    });
  }
  deleteRow(event, cell, cellValue, row) {
    var r = cell;
    var data = {
      "username":row.username,
    }
    this.adminService.deleteCinemaOwner(data).subscribe((response)=>{
      console.log(response);
      this.ngOnInit();
    });
  }
  updateFilter(event) {
    const val = event.target.value;
    var data = {
      cinema_name: val
    }
    this.adminService.getCinemaOwner(data).subscribe((response)=>{
      this.rows=response;
    });
  }

}
