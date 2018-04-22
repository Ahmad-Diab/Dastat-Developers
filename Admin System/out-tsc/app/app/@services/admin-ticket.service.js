var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpService } from "./http.service";
import { Http } from "@angular/http";
import { CookieService } from "angular2-cookie/core";
var AdminTicketService = (function (_super) {
    __extends(AdminTicketService, _super);
    function AdminTicketService(cookie, http) {
        var _this = _super.call(this, cookie, http) || this;
        _this.cookie = cookie;
        _this.http = http;
        return _this;
    }
    AdminTicketService.prototype.makeReservationByAdmin = function (cinema_name, cinema_location, party_date, party_time, hall, payment, tickets, tickets_price, movie_id, comment) {
        var cinema_username = cinema_name.toLowerCase().trim() + "_" + cinema_location.toLowerCase().trim();
        return this.post("/tickets/makeReservationAsAdmin", {
            'username': cinema_username,
            'cinema_name': cinema_name,
            'cinema_location': cinema_location,
            'date': party_date,
            'time': party_time,
            'hall': hall,
            'payment': payment,
            'tickets': tickets,
            'price': tickets_price,
            'movie': movie_id,
            'comment': comment
        });
    };
    AdminTicketService.prototype.viewTicketInfo = function (adminUsername, reservation_id) {
        return this.get('/tickets/viewTicketInfo', { headers: {
                'username': adminUsername,
                'reservation_id': reservation_id
            }
        });
    };
    AdminTicketService.prototype.verifyUnpaidTicket = function (adminUsername, reservation_id) {
        //TODO this need to be patch method instead
        return this.patch('/tickets/verifyUnpaidTicket', {
            'username': adminUsername,
            'reservation_id': reservation_id
        });
    };
    AdminTicketService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [CookieService, Http])
    ], AdminTicketService);
    return AdminTicketService;
}(HttpService));
export { AdminTicketService };
//# sourceMappingURL=admin-ticket.service.js.map