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

    type = "";
    add = false;
    locations = [];
    cinemas = [];

    constructor(public cookie: CookieService,
        public activeModal: NgbActiveModal,
        public modalService: NgbModal,
        public adminService: AdminService,
        public hallService: HallService) { }

    ngOnInit() {
        if (this.admin == undefined) {
            this.hallService.getCinemaLocations().subscribe((response) => {
                this.locations = response;
                var data = {
                  cinema_location: this.locations[0].location
                };
        
                this.hallService.getCinemasInLocation(data).subscribe((response) => {
                  this.cinemas = response;
                  this.admin.cinema_location = this.locations[0].location;
                  this.admin.cinema_name = this.cinemas[0].name;
                });
              });
            this.add = true;
            this.admin = new Admin();
        }
    }

    getCinemaNames(event) {
        var data = {
            cinema_location: event.target.value
        };
  
        this.hallService.getCinemasInLocation(data).subscribe((response) => {
            this.cinemas = response;
            this.admin.cinema_name = this.cinemas[0].name;
        });
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
