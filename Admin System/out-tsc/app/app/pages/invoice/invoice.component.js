var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
var InvoiceComponent = (function () {
    function InvoiceComponent() {
        this.invoiceItems = [{
                'title': 'Maintanance',
                'subtitle': 'Monthly web updates for http://www.themeforest.net',
                'price': 250.00,
                'quantity': 1
            }, {
                'title': 'Recurring Bill (Hosting)',
                'subtitle': 'Monthly dedicated VPN web hosting (1 Jan - 30 Jan, 2014)',
                'price': 652.87,
                'quantity': 3
            }, {
                'title': 'Recurring Bill (Domain)',
                'subtitle': '2 year domain name purchase',
                'price': 239.00,
                'quantity': 3
            }, {
                'title': 'Web design',
                'subtitle': 'PSD to HTML Conversion (3 pages)',
                'price': 958.00,
                'quantity': 1
            }];
        this.invoiceTotals = [{
                'subtotal': this.getSubTotal(),
                'tax': this.getCalculatedTax(),
                'discount': 0.00,
                'total': 0
            }];
    }
    InvoiceComponent.prototype.getSubTotal = function () {
        var total = 0.00;
        for (var i = 1; i < this.invoiceItems.length; i++) {
            total += (this.invoiceItems[i].price * this.invoiceItems[i].quantity);
        }
        return total;
    };
    InvoiceComponent.prototype.getCalculatedTax = function () {
        return ((15 * this.getSubTotal()) / 100);
    };
    InvoiceComponent.prototype.getTotal = function () {
        return (this.getSubTotal() + this.getCalculatedTax());
    };
    InvoiceComponent = __decorate([
        Component({
            selector: 'app-invoice',
            templateUrl: './invoice.component.html',
            styleUrls: ['./invoice.component.scss']
        })
    ], InvoiceComponent);
    return InvoiceComponent;
}());
export { InvoiceComponent };
//# sourceMappingURL=invoice.component.js.map