import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { throttle } from '@swimlane/ngx-charts/release/utils';
import { AdminService } from '../../@services/adminService.service';

@Component({
  selector: 'app-view-admin',
  templateUrl: './view-admin.component.html',
  styleUrls: ['./view-admin.component.scss']
})
export class ViewAdminComponent implements OnInit {

  cinema_name: string;

  rows = [];
  temp = [];
/*
  columns = [
    { name: 'cinema_name' },
    { name: 'Username' },
    { name: 'Email' },
    { name: 'Type' },
    { name: 'Salary' },
    { name: 'First Name' },
    { name: 'Last Name' },
    { name: 'Phone Number' },
    { name: 'Gender' },
  ];
  */
  constructor(public adminService: AdminService, private router : Router, public cookie : CookieService, private route : ActivatedRoute) { }

  ngOnInit() {
    
    this.adminService.getAdmins().subscribe((response)=>{
      this.rows = response;
      console.log(response);
    });
  }
  updateFilter(event) {
    const val = event.target.value;
    var data = {
      cinema_name: val
    }
    //console.log(val);
    this.adminService.getAdmin(data).subscribe((response)=>{
      this.rows = response;
      //console.log(response);
    });
  }
}
