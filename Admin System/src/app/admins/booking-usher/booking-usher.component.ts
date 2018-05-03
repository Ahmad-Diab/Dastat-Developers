import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { throttle } from '@swimlane/ngx-charts/release/utils';
import { AdminService } from '../../@services/adminService.service';
import { Admin } from '../../@objects/admin';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from '../../@objects/alert';
import { ModalAdmin } from '../modals/admin.component';
import { CinemaslistService } from '../../@services/cinemaslist.service';

@Component({
  selector: 'app-edit',
  templateUrl: './booking-usher.component.html',
  styleUrls: ['./booking-usher.component.scss']
})
export class BookingUsher implements OnInit {
  cinemaChoosen;
  username: string;

  editing = {};
  rows: Admin[];
  alert: Alert = new Alert();

  cinemas = [];

  constructor(public adminService: AdminService, public cinemalistService: CinemaslistService, private router : Router, public cookie : CookieService, private route : ActivatedRoute, public modalService: NgbModal) { }
  ngOnInit() {
    var data = {
      username: this.cookie.getObject('auth')['username'],
      
    }
    console.log(data);

    this.adminService.getBookingUshers(data).subscribe((response)=>{
      this.rows = response.data;
      console.log(response);
    });

    this.cinemalistService.getAllCinemas().subscribe((response) => {
      this.cinemas = response.data;
      console.log(this.cinemas)
      this.cinemaChoosen = 'all';
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
    this.adminService.deleteBookingUsher(admin).subscribe(() => {
      this.alert = {
        message: 'Admin Deleted',
        type: 'success',
        active: true
      }

      this.ngOnInit();
    });
  }
  addBookingUsher(){
    const modalRef = this.modalService.open(ModalAdmin);
    modalRef.componentInstance.type = "BU";
    modalRef.result.then((result) => {
      this.alert = result;
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