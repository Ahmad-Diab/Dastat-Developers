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
import { Http } from '@angular/http';
import { HttpService } from './http.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
var PromocodesService = (function (_super) {
    __extends(PromocodesService, _super);
    function PromocodesService(cookie, http) {
        var _this = _super.call(this, cookie, http) || this;
        _this.cookie = cookie;
        _this.http = http;
        return _this;
    }
    /**
     * Sends get request to get the promocodes data:
     * (Promocode, type, value, cinema name that the promocode is used in, cinema location)
     * @returns Array of JSON objects of promocodes
     */
    PromocodesService.prototype.getPromocodes = function () {
        return this.get('promocodes');
    };
    PromocodesService.prototype.getPromocodesAndCinemas = function () {
        return this.get('promocodes/viewPromocodesAndCinemas');
    };
    PromocodesService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [CookieService, Http])
    ], PromocodesService);
    return PromocodesService;
}(HttpService));
export { PromocodesService };
//# sourceMappingURL=promocodes.service.js.map