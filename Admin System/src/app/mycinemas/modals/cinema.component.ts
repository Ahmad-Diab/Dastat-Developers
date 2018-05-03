import { Component, Input, OnInit } from "@angular/core";
import { CookieService } from "angular2-cookie/services";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Cinema } from "../../@objects/cinema";
import { CinemaslistService } from "../../@services/cinemaslist.service";

@Component({
    selector: 'modal-task',
    templateUrl: './cinema.component.html',
})

export class ModalCinema implements OnInit {

    @Input() cinema: Cinema;

    add: boolean;
    image1: boolean;
    image2: boolean;

    constructor(public cookie: CookieService,
        public activeModal: NgbActiveModal,
        public modalService: NgbModal,
        public cinemalistService: CinemaslistService) { }

    ngOnInit() {
        if (this.cinema == undefined) {
            this.add = true;
            this.cinema = new Cinema();
            // this.cinema.is3D = {type: "Buffer", data: Array(1)}
            // this.cinema.is4D = {type: "Buffer", data: Array(1)}
            // this.cinema.is3D.data[0] = 0;
            // this.cinema.is4D.data[0] = 0;
            this.cinema.is3D = 0;
            this.cinema.is4D = 0;
        }
    }

    close() {
        // var alert = {
        //     message: 'No Changes Added',
        //     type: 'danger',
        //     active: true
        // };
        this.activeModal.close(alert);
    }

    submit() {

        if(this.add) {
            this.cinema.is3D = parseInt(this.cinema.is3D);
            this.cinema.is4D = parseInt(this.cinema.is4D);
            this.cinemalistService.addCinema(this.cinema).subscribe((response) => {
                var alert = {
                    message: response.msg,
                    type: 'success',
                    active: true
                };
                this.activeModal.close(alert);
            });
        } else {
            this.cinema.is3D = parseInt(this.cinema.is3D);
            this.cinema.is4D = parseInt(this.cinema.is4D);
            this.cinemalistService.Update(this.cinema.location,this.cinema.name,this.cinema).subscribe((response) => {
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
