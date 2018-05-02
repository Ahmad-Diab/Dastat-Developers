import { Component, Input, OnInit } from "@angular/core";
import { CookieService } from "angular2-cookie/services";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Admin } from "../../@objects/admin";
import { AdminService } from "../../@services/adminService.service";

@Component({
    selector: 'modal-task',
    templateUrl: './admin.component.html',
})

export class ModalAdmin implements OnInit {

    @Input() admin: Admin;

    type = "";
    add = false;

    constructor(public cookie: CookieService,
        public activeModal: NgbActiveModal,
        public modalService: NgbModal,
        public adminService: AdminService) { }

    ngOnInit() {
        if (this.admin == undefined) {
            this.add = true;
            this.admin = new Admin();
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
            if(this.type == "CO") {
                this.adminService.addCinemaOwner(this.admin).subscribe(() => {
                    var alert = {
                        message: 'Cinema Owner Added!',
                        type: 'success',
                        active: true
                    };
                    this.activeModal.close(alert);
                });
            } else if(this.type == "BM") {
                this.adminService.addBranchManager(this.admin).subscribe(() => {
                    var alert = {
                        message: 'Branch Manager Added!',
                        type: 'success',
                        active: true
                    };
                    this.activeModal.close(alert);
                });
            } else if(this.type == "BU") {
                this.adminService.addBookingUsher(this.admin).subscribe(() => {
                    var alert = {
                        message: 'Booking Usher Added!',
                        type: 'success',
                        active: true
                    };
                    this.activeModal.close(alert);
                });
            }
        } else {
            if(this.type == "CO") {
                this.adminService.editCinemaOwner(this.admin).subscribe(() => {
                    var alert = {
                        message: 'Admin Edited!',
                        type: 'success',
                        active: true
                    };
                    this.activeModal.close(alert);
                });
            } else if (this.type == "BM") {
                this.adminService.editBranchManager(this.admin).subscribe(() => {
                    var alert = {
                        message: 'Admin Edited!',
                        type: 'success',
                        active: true
                    };
                    this.activeModal.close(alert);
                });
            } else if (this.type == "BU") {
                this.adminService.editBookingUsher(this.admin).subscribe(() => {
                    var alert = {
                        message: 'Admin Edited!',
                        type: 'success',
                        active: true
                    };
                    this.activeModal.close(alert);
                });
            }
        }
    }

}
