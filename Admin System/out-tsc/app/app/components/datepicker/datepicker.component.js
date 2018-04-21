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
import { Component, Injectable } from '@angular/core';
import { NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';
var now = new Date();
var I18N_VALUES = {
    en: {
        weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    fr: {
        weekdays: ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'],
        months: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Déc'],
    }
};
// Define a service holding the language. You probably already have one if your app is i18ned.
var I18n = (function () {
    function I18n() {
        this.language = 'en';
    }
    I18n = __decorate([
        Injectable()
    ], I18n);
    return I18n;
}());
export { I18n };
// Define custom service providing the months and weekdays translations
var CustomDatepickerI18n = (function (_super) {
    __extends(CustomDatepickerI18n, _super);
    function CustomDatepickerI18n(_i18n) {
        var _this = _super.call(this) || this;
        _this._i18n = _i18n;
        return _this;
    }
    CustomDatepickerI18n.prototype.getWeekdayShortName = function (weekday) {
        return I18N_VALUES[this._i18n.language].weekdays[weekday - 1];
    };
    CustomDatepickerI18n.prototype.getMonthShortName = function (month) {
        return I18N_VALUES[this._i18n.language].months[month - 1];
    };
    CustomDatepickerI18n.prototype.getMonthFullName = function (month) {
        return this.getMonthShortName(month);
    };
    CustomDatepickerI18n = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [I18n])
    ], CustomDatepickerI18n);
    return CustomDatepickerI18n;
}(NgbDatepickerI18n));
export { CustomDatepickerI18n };
var DatepickerComponent = (function () {
    function DatepickerComponent(_i18n) {
        this._i18n = _i18n;
        this.displayMonths = 2;
        this.navigation = 'select';
        this.disabledModel = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
        this.disabled = true;
    }
    Object.defineProperty(DatepickerComponent.prototype, "language", {
        get: function () {
            return this._i18n.language;
        },
        set: function (language) {
            this._i18n.language = language;
        },
        enumerable: true,
        configurable: true
    });
    DatepickerComponent.prototype.selectToday = function () {
        this.model = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    };
    DatepickerComponent.prototype.isWeekend = function (date) {
        var d = new Date(date.year, date.month - 1, date.day);
        return d.getDay() === 0 || d.getDay() === 6;
    };
    DatepickerComponent.prototype.isDisabled = function (date, current) {
        return date.month !== current.month;
    };
    DatepickerComponent.prototype.ngOnInit = function () {
        this.selectToday();
    };
    DatepickerComponent = __decorate([
        Component({
            selector: 'app-datepicker',
            templateUrl: './datepicker.component.html',
            styleUrls: ['./datepicker.component.scss'],
            providers: [I18n, { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }] // define custom NgbDatepickerI18n provider
        }),
        __metadata("design:paramtypes", [I18n])
    ], DatepickerComponent);
    return DatepickerComponent;
}());
export { DatepickerComponent };
//# sourceMappingURL=datepicker.component.js.map