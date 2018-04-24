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

    locations;
    names;
    layouts;
    add: boolean;

    constructor(public cookie: CookieService,
        public activeModal: NgbActiveModal,
        public modalService: NgbModal,
        public hallService: HallService) { }

    ngOnInit() {
        if (this.hall == undefined) {
            this.add = true;
            this.hall = new Hall();
            this.hall.cinema_location = '0';
            this.hall.cinema_name = '0';
            this.hall.layout = 0;
        } else {
            var data = {
                cinema_location: this.hall.cinema_location
            };

            this.hallService.getCinemasInLocation(data).subscribe((response) => {
                this.names = response;
            });
        }

        this.hallService.getCinemaLocations().subscribe((response) => {
            this.locations = response;
        });

        this.hallService.getMinifiedLayouts().subscribe((response) => {
            this.layouts = response;
        });

    }

    getCinemaNames(event) {
        var data = {
            cinema_location: event.target.value
        };

        this.hallService.getCinemasInLocation(data).subscribe((response) => {
            this.names = response;
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
            this.hallService.addHall(this.hall).subscribe(() => {
                var alert = {
                    message: 'Hall Added!',
                    type: 'success',
                    active: true
                };
                this.activeModal.close(alert);
            });
        } else {
            this.hallService.editHall(this.hall).subscribe(() => {
                var alert = {
                    message: 'Hall Edited!',
                    type: 'success',
                    active: true
                };
                this.activeModal.close(alert);
            });
        }

    }

}
