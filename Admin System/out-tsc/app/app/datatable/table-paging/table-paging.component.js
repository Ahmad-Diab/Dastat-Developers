var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
var TablePagingComponent = (function () {
    function TablePagingComponent() {
        this.rows = [];
        this.count = 0;
        this.offset = 0;
        this.limit = 10;
    }
    TablePagingComponent.prototype.ngOnInit = function () {
        this.page(this.offset, this.limit);
    };
    TablePagingComponent.prototype.page = function (offset, limit) {
        var _this = this;
        this.fetch(function (results) {
            _this.count = results.length;
            var start = offset * limit;
            var end = start + limit;
            var rows = _this.rows.slice();
            for (var i = start; i < end; i++) {
                rows[i] = results[i];
            }
            _this.rows = rows;
            console.log('Page Results', start, end, rows);
        });
    };
    TablePagingComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            cb(JSON.parse(req.response));
        };
        req.send();
    };
    TablePagingComponent.prototype.onPage = function (event) {
        console.log('Page Event', event);
        this.page(event.offset, event.limit);
    };
    TablePagingComponent = __decorate([
        Component({
            selector: 'app-table-paging',
            templateUrl: './table-paging.component.html',
            styleUrls: ['./table-paging.component.scss']
        })
    ], TablePagingComponent);
    return TablePagingComponent;
}());
export { TablePagingComponent };
//# sourceMappingURL=table-paging.component.js.map