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
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { map } from "rxjs/operators";
var HttpService = (function () {
    function HttpService(cookie, http) {
        this.cookie = cookie;
        this.http = http;
    }
    HttpService.prototype.createAuthorizationHeader = function (headers) {
        var auth = (this.cookie.getObject('auth'));
        headers.append('authorization', "token " + auth.token);
    };
    HttpService.prototype.get_auth = function (route, data) {
        var headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(environment.api + route, { headers: headers }).pipe(map(function (res) { return res.json(); }));
    };
    HttpService.prototype.post_auth = function (route, data) {
        var headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.post(environment.api + route, { headers: headers }, data).pipe(map(function (res) { return res.json(); }));
    };
    HttpService.prototype.get = function (route, data) {
        return this.http.get(environment.api + route, data).pipe(map(function (res) { return res.json(); }));
    };
    HttpService.prototype.post = function (route, data) {
        return this.http.post(environment.api + route, data).pipe(map(function (res) { return res.json(); }));
    };
    HttpService.prototype.patch = function (route, data) {
        return this.http.patch(environment.api + route, data).pipe(map(function (res) { return res.json(); }));
    };
    HttpService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [CookieService,
            Http])
    ], HttpService);
    return HttpService;
}());
export { HttpService };
//# sourceMappingURL=http.service.js.map