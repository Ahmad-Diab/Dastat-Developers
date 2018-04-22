var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
var AlertComponent = (function () {
    function AlertComponent() {
        this.alerts = [];
        this._success = new Subject();
        this.staticAlertClosed = false;
        this.alerts.push({
            id: 1,
            type: 'success',
            message: 'This is an success alert',
        }, {
            id: 2,
            type: 'info',
            message: 'This is an info alert',
        }, {
            id: 3,
            type: 'warning',
            message: 'This is a warning alert',
        }, {
            id: 4,
            type: 'danger',
            message: 'This is a danger alert',
        });
        this.backup = this.alerts.map(function (alert) { return Object.assign({}, alert); });
    }
    AlertComponent.prototype.closeAlert = function (alert) {
        var index = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    };
    AlertComponent.prototype.reset = function () {
        this.alerts = this.backup.map(function (alert) { return Object.assign({}, alert); });
    };
    AlertComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return _this.staticAlertClosed = true; }, 20000);
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.debounceTime(5000).subscribe(function () { return _this.successMessage = null; });
    };
    AlertComponent.prototype.changeSuccessMessage = function () {
        this._success.next(new Date() + " - Message successfully changed.");
    };
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AlertComponent.prototype, "alerts", void 0);
    AlertComponent = __decorate([
        Component({
            selector: 'app-alert',
            templateUrl: './alert.component.html',
            styleUrls: ['./alert.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], AlertComponent);
    return AlertComponent;
}());
export { AlertComponent };
//# sourceMappingURL=alert.component.js.map