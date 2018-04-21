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
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import emailMask from 'text-mask-addons/dist/emailMask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe';
import { FormControl } from '@angular/forms';
import { placeholderChars, alphabetic, digit } from './constants';
var defaultValues = {
    placeholderChar: placeholderChars.whitespace,
    guide: true,
    pipe: null,
    keepCharPositions: false,
    help: null,
    placeholder: null
};
var MasksComponent = (function () {
    function MasksComponent() {
        this.formControlInput = new FormControl();
        this.choices = [{
                name: 'US phone number',
                mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
                placeholder: '(555) 495-3947'
            }, {
                name: 'US phone number with country code',
                mask: ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
                placeholder: '+1 (555) 495-3947'
            }, {
                name: 'Date',
                mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
                placeholder: '25/09/1970'
            }, {
                name: 'Date (auto-corrected)',
                mask: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
                pipe: createAutoCorrectedDatePipe(),
                placeholder: 'Please enter a date',
            }, {
                name: 'US dollar amount',
                mask: createNumberMask(),
                placeholder: 'Enter an amount',
            }, {
                name: 'US dollar amount (allows decimal)',
                mask: createNumberMask({ allowDecimal: true }),
                placeholder: 'Enter an amount',
            }, {
                name: 'Percentage amount',
                mask: createNumberMask({ suffix: '%', prefix: '' }),
                placeholder: 'Enter an amount',
            }, {
                name: 'Email',
                mask: emailMask,
                placeholder: 'john@smith.com',
            }, {
                name: 'US zip code',
                mask: [/[1-9]/, /\d/, /\d/, /\d/, /\d/],
                placeholder: '94303',
            }, {
                name: 'Canadian postal code',
                mask: [alphabetic, digit, alphabetic, ' ', digit, alphabetic, digit],
                pipe: function (conformedValue) { return ({ value: conformedValue.toUpperCase() }); },
                placeholder: 'K1A 0B2'
            }];
        this.mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        this.myModel = '';
        this.modelWithValue = '5554441234';
        this.formControlInput.setValue('5555551234');
    }
    MasksComponent = __decorate([
        Component({
            selector: 'app-masks',
            templateUrl: './masks.component.html',
            styleUrls: ['./masks.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], MasksComponent);
    return MasksComponent;
}());
export { MasksComponent };
//# sourceMappingURL=masks.component.js.map