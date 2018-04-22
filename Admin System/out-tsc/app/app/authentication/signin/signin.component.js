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
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../@services/auth.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
var SigninComponent = (function () {
    function SigninComponent(fb, router, cookie, authService) {
        this.fb = fb;
        this.router = router;
        this.cookie = cookie;
        this.authService = authService;
    }
    SigninComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            uname: [null, Validators.compose([Validators.required])], password: [null, Validators.compose([Validators.required])]
        });
    };
    SigninComponent.prototype.onSubmit = function () {
        var _this = this;
        var data = {
            username: this.username,
            password: this.password
        };
        this.authService.login(data).subscribe(function (response) {
            var auth = {
                username: response.username,
                token: response.data
            };
            _this.cookie.putObject('auth', auth);
            _this.router.navigate(['/']);
        }, function (error) {
            _this.message = 'username or password are wrong, try again!';
        });
    };
    SigninComponent = __decorate([
        Component({
            selector: 'app-signin',
            templateUrl: './signin.component.html',
            styleUrls: ['./signin.component.scss']
        }),
        __metadata("design:paramtypes", [FormBuilder,
            Router,
            CookieService,
            AuthService])
    ], SigninComponent);
    return SigninComponent;
}());
export { SigninComponent };
//# sourceMappingURL=signin.component.js.map