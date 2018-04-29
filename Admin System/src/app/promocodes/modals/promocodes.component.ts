import { Component, Input, OnInit } from "@angular/core";
import { CookieService } from "angular2-cookie/services";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PromocodesService } from '../../@services/promocodes.service';
import { Promocode } from "../../@objects/promocode";

@Component({
    selector: 'modal-task',
    templateUrl: './promocodes.component.html',
})

export class ModalPromocodes implements OnInit {

    @Input() promocode: Promocode;

    promoCode;
    type;
    value;
    add: boolean;

    constructor(public cookie: CookieService,
        public activeModal: NgbActiveModal,
        public modalService: NgbModal,
        public promocodesService: PromocodesService) { }

    ngOnInit() {
        if (this.promocode == undefined) {
            this.add = true;
            this.promocode = new Promocode();
            this.promocode.promocode = '0';
            this.promocode.type = '0';
            this.promocode.value = '0';
        } 

        this.promoCode = this.promocode.promocode;
        this.type = this.promocode.type;
        this.value = this.promocode.value;

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
            this.promocodesService.addPromocodes(this.promoCode,this.type,this.value).subscribe(() => {
                var alert = {
                    message: 'Promocode Added!',
                    type: 'success',
                    active: true
                };
                this.activeModal.close(alert);
            });
        } else {
            this.promocodesService.editPromocode(this.promoCode,this.type,this.value).subscribe(() => {
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
