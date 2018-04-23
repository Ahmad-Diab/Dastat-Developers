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
var TableSortingComponent = (function () {
    function TableSortingComponent() {
        var _this = this;
        this.rows = [];
        this.columns = [
            { name: 'Company' },
            { name: 'Name' },
            { name: 'Gender' }
        ];
        this.fetch(function (data) {
            _this.rows = data;
        });
    }
    TableSortingComponent.prototype.fetch = function (cb) {
        var req = new XMLHttpRequest();
        req.open('GET', "assets/data/company.json");
        req.onload = function () {
            var data = JSON.parse(req.response);
            cb(data);
        };
        req.send();
    };
    TableSortingComponent = __decorate([
        Component({
            selector: 'app-table-sorting',
            templateUrl: './table-sorting.component.html',
            styleUrls: ['./table-sorting.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], TableSortingComponent);
    return TableSortingComponent;
}());
export { TableSortingComponent };
//# sourceMappingURL=table-sorting.component.js.map