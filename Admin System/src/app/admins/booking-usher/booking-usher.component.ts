import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { throttle } from '@swimlane/ngx-charts/release/utils';
import { AdminService } from '../../@services/adminService.service';
import { Admin } from '../../@objects/admin';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from '../../@objects/alert';
import { ModalAdmin } from '../modals/admin.component';

@Component({
  selector: 'app-edit',
  templateUrl: './booking-usher.component.html',
  styleUrls: ['./booking-usher.component.scss']
})
export class BookingUsher implements OnInit {
  cinema_name: string;
  //uname: string;

  editing = {};
  rows: Admin[];
  alert: Alert = new Alert();

  constructor(public adminService: AdminService, private router : Router, public cookie : CookieService, private route : ActivatedRoute, public modalService: NgbModal) { }
  ngOnInit() {
    /*var data = {
      uname: this.cookie.getObject('auth')['username']
    }
    console.log(data);*/
    this.adminService.getBookingUshers().subscribe((response)=>{
      this.rows = response.data;
      console.log(response);
    });
  }
  updateValue(admin) {
    const modalRef = this.modalService.open(ModalAdmin);
    modalRef.componentInstance.admin = admin;
    modalRef.componentInstance.type = "BU";
    modalRef.result.then((result) => {
      this.alert = result;
      this.ngOnInit();
    });
  }
  deleteRow(admin) {
    this.adminService.deleteBranchManager(admin).subscribe(() => {
      this.alert = {
        message: 'Admin Deleted',
        type: 'success',
        active: true
      }

      this.ngOnInit();
    });
  }
  // updateFilter(event) {
  //   const val = event.target.value;
  //   var data = {
  //     cinema_name: val
  //   }
  //   this.adminService.getBookingUsher(data).subscribe((response)=>{
  //     this.rows=response;
  //   });
  // }
}