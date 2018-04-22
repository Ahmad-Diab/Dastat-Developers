var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { AdminTicketService } from "../../@services/admin-ticket.service";
import { CookieService } from "angular2-cookie/core";
var VerifyTicketComponent = (function () {
    function VerifyTicketComponent(adminTicketService, cookie) {
        this.adminTicketService = adminTicketService;
        this.cookie = cookie;
        this.reservation_id = null;
        this.ticketView = null;
        this.adminUsername = this.cookie.get("adminUsername");
        this.ticketIsLoaded = false;
        this.error = null;
        this.ticketVerified = true;
        this.btn_verifyTicket = 'Verify Ticket';
    }
    VerifyTicketComponent.prototype.ngOnInit = function () {
        if (!this.cookie.get("reservation_id")) {
            this.reservation_id = this.cookie.get('reservation_id');
            this.ticketView = this.cookie.get('ticketView');
        }
    };
    VerifyTicketComponent.prototype.getTicket = function (event) {
        var _this = this;
        this.reservation_id = event.target.value;
        console.log(this.reservation_id);
        if (this.reservation_id) {
            try {
                this.adminTicketService.viewTicketInfo('some admin', this.reservation_id)
                    .subscribe(function (res) {
                    //TODO check response status
                    if (!res.err && res.data) {
                        _this.ticketView = res.data;
                        _this.ticketIsLoaded = true;
                        if (_this.ticketView.payment.data[0]) {
                            _this.ticketVerified = true;
                            _this.btn_verifyTicket = 'Verified';
                        }
                        else {
                            _this.ticketVerified = false;
                            _this.btn_verifyTicket = 'Verify Ticket';
                        }
                    }
                    else {
                        _this.ticketIsLoaded = false;
                        _this.ticketVerified = false;
                        _this.btn_verifyTicket = 'Verify Ticket';
                    }
                });
            }
            finally {
                this.ticketIsLoaded = false;
                this.ticketVerified = true;
                this.btn_verifyTicket = 'Verify Ticket';
            }
            console.log(this.ticketView);
        }
        else {
            this.ticketView = null;
        }
        if (!this.ticketView) {
            this.ticketIsLoaded = false;
            this.ticketVerified = true;
            this.btn_verifyTicket = 'Verify Ticket';
        }
    };
    VerifyTicketComponent.prototype.verifyTicket = function () {
        var _this = this;
        console.log('VERIFY TICKET TO BE DONE');
        console.log(this.reservation_id);
        console.log(this.ticketView.payment.data[0]);
        if (this.ticketView && !this.ticketView.payment.data[0]) {
            this.adminTicketService.verifyUnpaidTicket('some admin', this.ticketView.reservation_id)
                .subscribe(function (res) {
                if (res.data) {
                    _this.ticketVerified = true;
                    _this.btn_verifyTicket = 'Verified';
                }
            });
        }
    };
    VerifyTicketComponent = __decorate([
        Component({
            selector: 'app-verify-ticket',
            templateUrl: './verify-ticket.component.html',
            styleUrls: ['./verify-ticket.component.scss']
        }),
        __metadata("design:paramtypes", [AdminTicketService, CookieService])
    ], VerifyTicketComponent);
    return VerifyTicketComponent;
}());
export { VerifyTicketComponent };
//# sourceMappingURL=verify-ticket.component.js.map