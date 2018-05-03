import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { throttle } from '@swimlane/ngx-charts/release/utils';
import { AdminService } from '../../@services/adminService.service';
import { Alert } from '../../@objects/alert';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAdmin } from '../modals/admin.component';
import { Admin } from '../../@objects/admin';
import { CinemaslistService } from '../../@services/cinemaslist.service';


@Component({
  selector: 'app-cinema-owner',
  templateUrl: './cinema-owner.component.html',
  styleUrls: ['./cinema-owner.component.scss']
})
export class CinemaOwnerComponent implements OnInit {

  cinema_name: string;
  editing = {};
  rows: Admin[];
  alert: Alert = new Alert();

  cinemaChoosen;
  cinemas = [];

  constructor(public adminService: AdminService, public cinemalistService: CinemaslistService, private router : Router, public cookie : CookieService, private route : ActivatedRoute, public modalService: NgbModal) { }
  ngOnInit() {
    this.adminService.getCinemaOwners().subscribe((response)=>{
      this.rows = response;
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
    modalRef.componentInstance.type = "CO";
    modalRef.result.then((result) => {
      this.alert = result;
      this.ngOnInit();
    });
  }
  deleteRow(admin) {
    this.adminService.deleteCinemaOwner(admin).subscribe(() => {
      this.alert = {
        message: 'Admin Deleted',
        type: 'success',
        active: true
      }

      this.ngOnInit();
    });
  }
  addCinemaOwner(){
    const modalRef = this.modalService.open(ModalAdmin);
    modalRef.componentInstance.type = "CO";
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
  //   this.adminService.getCinemaOwner(data).subscribe((response)=>{
  //     this.rows=response;
  //   });
  // }
  closeAlert() {
    this.alert.active = false;
  }
}
