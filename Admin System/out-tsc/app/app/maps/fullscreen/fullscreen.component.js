var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';
var FullscreenComponent = (function () {
    function FullscreenComponent() {
        this.lat = -33.4855814;
        this.lng = 146.4032773;
        this.zoom = 8;
        this.styles = [{
                featureType: 'all',
                stylers: [{
                        saturation: -100
                    }]
            }, {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{
                        hue: '#2ECC71'
                    }, {
                        saturation: 50
                    }]
            }, {
                featureType: 'poi.business',
                elementType: 'labels',
                stylers: [{
                        visibility: 'off'
                    }]
            }];
    }
    FullscreenComponent.prototype.ngOnInit = function () {
        var _this = this;
        var ro = new ResizeObserver(function (entries, observer) {
            _this.map.triggerResize();
        });
        ro.observe(document.querySelector('#sebm-map'));
    };
    __decorate([
        ViewChild('map'),
        __metadata("design:type", Object)
    ], FullscreenComponent.prototype, "map", void 0);
    FullscreenComponent = __decorate([
        Component({
            selector: 'app-fullscreen',
            templateUrl: './fullscreen.component.html',
            styleUrls: ['./fullscreen.component.scss']
        })
    ], FullscreenComponent);
    return FullscreenComponent;
}());
export { FullscreenComponent };
//# sourceMappingURL=fullscreen.component.js.map