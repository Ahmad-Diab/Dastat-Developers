import { Component, Input, OnInit } from "@angular/core";
import { CookieService } from "angular2-cookie/services";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HallService } from "../../@services/hall.service";
import { Hall } from "../../@objects/hall";

@Component({
    selector: 'modal-task',
    templateUrl: './hall.component.html',
})

export class ModalHall implements OnInit {

    @Input() hall: Hall;

    constructor(public cookie: CookieService,
        public activeModal: NgbActiveModal,
        public modalService: NgbModal,
        public hallService: HallService) { }

    ngOnInit() {
        if (this.hall == undefined) {
            this.hall = new Hall();
            this.hall.cinema_location = '0';
            this.hall.cinema_name = '0';
            this.hall.layout = 0;
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
        this.hallService.addHall(this.hall).subscribe(() => {
            var alert = {
                message: 'Hall Added!',
                type: 'success',
                active: true
            };
            this.activeModal.close(alert);
        });
    }

}
