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
import { PromocodesService } from '../../@services/promocodes.service';
var ViewPromocodesComponent = (function () {
    function ViewPromocodesComponent(promocodesService) {
        this.promocodesService = promocodesService;
        this.promocodes = []; // array of promocodes, promocode has promocode data and in which cinema
        this.existPromocodes = ""; // String that when there are no promocodes, assigned to a message stating that for the admin
        this.promocodesToShow = []; //array of unique promocodes to choose from for assigning  promocode to cinema
        this.cinemasToShow = []; //array of cinemas to choose between for assigning promocode to cinema
    }
    ViewPromocodesComponent.prototype.ngOnInit = function () {
        var _this = this;
        //  Get the promocodes data in promocodes array
        this.promocodesService.getPromocodes().subscribe(function (response) {
            _this.promocodes = response.data;
            if (_this.promocodes.length === 0)
                _this.existPromocodes = "No Promocodes exist";
            else
                _this.existPromocodes = "";
            // Get the distinct values of promocodes and cinemas to choose from in assigning promocodes to cinemas  
            _this.promocodesService.getPromocodesAndCinemas().subscribe(function (response) {
                _this.promocodesToShow = response.data.promocodeResults;
                _this.cinemasToShow = response.data.cinemaResults;
            });
        });
    };
    ViewPromocodesComponent = __decorate([
        Component({
            selector: 'app-view-promocodes',
            templateUrl: './view-promocodes.component.html',
            styleUrls: ['./view-promocodes.component.scss']
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof PromocodesService !== "undefined" && PromocodesService) === "function" && _a || Object])
    ], ViewPromocodesComponent);
    return ViewPromocodesComponent;
    var _a;
}());
export { ViewPromocodesComponent };
//# sourceMappingURL=view-promocodes.component.js.map