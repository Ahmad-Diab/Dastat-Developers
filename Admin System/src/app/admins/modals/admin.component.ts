import { Component, Input, OnInit } from "@angular/core";
import { CookieService } from "angular2-cookie/services";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Admin } from "../../@objects/admin";
import { AdminService } from "../../@services/adminService.service";
import { HallService } from "../../@services/hall.service";

@Component({
    selector: 'modal-task',
    templateUrl: './admin.component.html',
})

export class ModalAdmin implements OnInit {

    @Input() admin: Admin;

    locations;
    names;
    type = "";

    constructor(public cookie: CookieService,
        public activeModal: NgbActiveModal,
        public modalService: NgbModal,
        public adminService: AdminService,
        public hallService: HallService) { }

    ngOnInit() {

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
