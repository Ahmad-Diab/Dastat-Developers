import { Component, Input, OnInit } from "@angular/core";
import { CookieService } from "angular2-cookie/services";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PromocodesService } from '../../@services/promocodes.service';
import { Promocode } from "../../@objects/promocode";
import { HallService } from "../../@services/hall.service";

@Component({
    selector: 'modal-task',
    templateUrl: './promocodes.component.html',
})

export class ModalPromocodes implements OnInit {

    @Input() promocode: Promocode;

    add: boolean;
    assigned: boolean;

    locations;
    cinemas;

    constructor(public cookie: CookieService,
        public activeModal: NgbActiveModal,
        public modalService: NgbModal,
        public promocodesService: PromocodesService,
        public hallService: HallService) { }

    ngOnInit() {

      if (this.promocode == undefined) {
        this.add = true;
        this.promocode = new Promocode();
        this.promocode.type = "amount";
      }
      this.hallService.getCinemaLocations().subscribe((response) => {
        this.locations = response;
        var data = {
          cinema_location: this.locations[0].location
        };

        this.hallService.getCinemasInLocation(data).subscribe((response) => {
          this.cinemas = response;
          this.promocode.cinema_location = this.locations[0].location;
          this.promocode.cinema_name = this.cinemas[0].name;
        });
      });

    }

    getCinemaNames(event) {
      var data = {
          cinema_location: event.target.value
      };

      this.hallService.getCinemasInLocation(data).subscribe((response) => {
          this.cinemas = response;
          this.promocode.cinema_name = this.cinemas[0].name;
      });
    }

    close() {
        this.activeModal.close(alert);
    }

    submit() {

        if(this.add) {
            this.promocodesService.addPromocodes(this.promocode.promocode,this.promocode.type,this.promocode.value).subscribe(() => {
                var alert = {
                    message: 'Promocode Added!',
                    type: 'success',
                    active: true
                };
                this.activeModal.close(alert);
            });
        } else if (this.assigned) {
          console.log(this.promocode.promocode,this.promocode.cinema_name,this.promocode.cinema_location)
            this.promocodesService.assignPromocodeToCinema(this.promocode.promocode,this.promocode.cinema_name,this.promocode.cinema_location).subscribe((response) =>{
              console.log(response)
              var alert = {
                message: 'Promocode Assigned!',
                type: 'success',
                active: true
              };
              this.activeModal.close(alert);
            });
        } else {
          console.log("hi2")
            this.promocodesService.editPromocode(this.promocode.promocode,this.promocode.type,this.promocode.value).subscribe(() => {
                var alert = {
                    message: 'Promocode Edited!',
                    type: 'success',
                    active: true
                };
                this.activeModal.close(alert);
            });
        }

    }

}
