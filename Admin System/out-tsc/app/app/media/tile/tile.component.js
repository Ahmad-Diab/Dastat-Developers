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
var TileComponent = (function () {
    function TileComponent() {
        this.images = [];
        this.images2 = [];
        this.num = 1;
        for (this.num; this.num <= 8; this.num += 1) {
            this.images.push(this.num);
        }
        for (this.num; this.num <= 21; this.num += 1) {
            this.images2.push(this.num);
        }
    }
    TileComponent = __decorate([
        Component({
            selector: 'app-tile',
            templateUrl: './tile.component.html',
            styleUrls: ['./tile.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], TileComponent);
    return TileComponent;
}());
export { TileComponent };
//# sourceMappingURL=tile.component.js.map