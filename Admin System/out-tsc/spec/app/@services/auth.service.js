"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_service_1 = require("./http.service");
var cookies_service_1 = require("angular2-cookie/services/cookies.service");
var http_1 = require("@angular/http");
var AuthService = (function (_super) {
    __extends(AuthService, _super);
    function AuthService(cookie, http) {
        var _this = _super.call(this, cookie, http) || this;
        _this.cookie = cookie;
        _this.http = http;
        return _this;
    }
    AuthService.prototype.login = function (data) {
        return this.post('adminlogin', data);
    };
    AuthService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [cookies_service_1.CookieService,
            http_1.Http])
    ], AuthService);
    return AuthService;
}(http_service_1.HttpService));
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map