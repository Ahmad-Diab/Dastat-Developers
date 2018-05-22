import { Component, Input, OnInit } from "@angular/core";
import { CookieService } from "angular2-cookie/services";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Admin } from "../../@objects/admin";
import { AdminService } from "../../@services/adminService.service";
import { CinemaslistService } from "../../@services/cinemaslist.service";

@Component({
    selector: 'modal-task',
    templateUrl: './admin.component.html',
})

export class ModalAdmin implements OnInit {

    @Input() admin: Admin;

    type = "";
    add = false;
    cinemas = [];
    cinemaNameLocation;

    constructor(public cookie: CookieService,
        public activeModal: NgbActiveModal,
        public modalService: NgbModal,
        public adminService: AdminService,
        public cinemalistService: CinemaslistService) { }

    ngOnInit() {
        if (this.admin == undefined) {
            this.add = true;
            this.admin = new Admin();
            this.cinemalistService.getAllCinemas().subscribe((response) => {
                this.cinemas = response.data;
                this.admin.gender = 'female';
                this.admin.cinema_name = this.cinemas[0].cinema_name;
                this.admin.cinema_location = this.cinemas[0].cinema_location;
                this.cinemaNameLocation = this.cinemas[0];
            });


        }
    }

    close() {
        var alert = {
            message: 'No Changes Added',
            type: 'danger',
            active: true
        };
        this.activeModal.close(alert);
    }

    submit() {

        if(this.add) {
            console.log(this.cinemaNameLocation)
            this.admin.cinema_name = this.cinemaNameLocation.name;
            this.admin.cinema_location = this.cinemaNameLocation.location;
            console.log(this.admin)
            if(this.type == "CO") {
                this.adminService.addCinemaOwner(this.admin).subscribe((response) => {
                    var alert = {
                        message: response.msg,
                        type: 'success',
                        active: true
                    };
                    this.activeModal.close(alert);
                });
            } else if(this.type == "BM") {
                this.adminService.addBranchManager(this.admin).subscribe((response) => {
                    var alert = {
                        message: response.msg,
                        type: 'success',
                        active: true
                    };
                    this.activeModal.close(alert);
                });
            } else if(this.type == "BU") {
                this.adminService.addBookingUsher(this.admin).subscribe((response) => {
                    var alert = {
                        message: response.msg,
                        type: 'success',
                        active: true
                    };
                    this.activeModal.close(alert);
                });
            }
        } else {
            if(this.type == "CO") {
                this.adminService.editCinemaOwner(this.admin).subscribe((response) => {
                    var alert = {
                        message: response.msg,
                        type: 'success',
                        active: true
                    };
                    this.activeModal.close(alert);
                });
            } else if (this.type == "BM") {
                this.adminService.editBranchManager(this.admin).subscribe((response) => {
                    var alert = {
                        message: response.msg,
                        type: 'success',
                        active: true
                    };
                    this.activeModal.close(alert);
                });
            } else if (this.type == "BU") {
                this.adminService.editBookingUsher(this.admin).subscribe((response) => {
                    var alert = {
                        message: response.msg,
                        type: 'success',
                        active: true
                    };
                    this.activeModal.close(alert);
                });
            }
        }
    }

}
