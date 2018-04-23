import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { throttle } from '@swimlane/ngx-charts/release/utils';
import { AdminService } from '../../@services/adminService.service';

@Component({
  selector: 'app-branch-manager',
  templateUrl: './branch-manager.component.html',
  styleUrls: ['./branch-manager.component.scss']
})
export class BranchManagerComponent implements OnInit {

  cinemaName: string;
  
  editing = {};
  rows = [];

  constructor(public adminService: AdminService, private router : Router, public cookie : CookieService, private route : ActivatedRoute) { }

  ngOnInit() {
    this.adminService.getBranchManagers().subscribe((response)=>{
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
    this.adminService.editBranchManager(data).subscribe((response)=>{
      console.log(response);
      this.ngOnInit();
    });
  }
  deleteRow(event, cell, cellValue, row) {
    var r = cell;
    var data = {
      "username":row.username,
    }
    this.adminService.deleteBranchManager(data).subscribe((response)=>{
      console.log(response);
      this.ngOnInit();
    });
  }
  updateFilter(event) {
    const val = event.target.value;
    var data = {
      cinemaName: val
    }
    this.adminService.getAdmin(data).subscribe((response)=>{
      this.rows=response;
    });
  }
}
