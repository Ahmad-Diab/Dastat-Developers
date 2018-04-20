var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MakeReservationComponent } from './make-reservation/make-reservation.component';
import { VerifyTicketComponent } from './verify-ticket/verify-ticket.component';
import { AdminBookingRoutes } from "./admin-booking.routing";
import { RouterModule } from "@angular/router";
var AdminBookingModule = (function () {
    function AdminBookingModule() {
    }
    AdminBookingModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                //AdminBookingRoutingModule,
                RouterModule.forChild(AdminBookingRoutes)
            ],
            declarations: [MakeReservationComponent, VerifyTicketComponent]
        })
    ], AdminBookingModule);
    return AdminBookingModule;
}());
export { AdminBookingModule };
//# sourceMappingURL=admin-booking.module.js.map