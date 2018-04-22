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
import { MailService } from './email.service';
import * as Quill from 'quill';
var EmailComponent = (function () {
    function EmailComponent(mailService) {
        this.mailService = mailService;
        this.messageOpen = false;
        this.isOpened = true;
        this._autoCollapseWidth = 991;
    }
    EmailComponent.prototype.ngOnInit = function () {
        if (this.isOver()) {
            this.isOpened = false;
        }
        this.getMessages();
    };
    EmailComponent.prototype.ngAfterContentInit = function () {
        var quill = new Quill('#editor-container', {
            modules: {
                toolbar: {
                    container: '#toolbar-toolbar'
                }
            },
            placeholder: 'Compose an epic...',
            theme: 'snow'
        });
    };
    EmailComponent.prototype.toogleSidebar = function () {
        this.isOpened = !this.isOpened;
    };
    EmailComponent.prototype.isOver = function () {
        return window.matchMedia("(max-width: 991px)").matches;
    };
    EmailComponent.prototype.getMessages = function () {
        var _this = this;
        this.mailService.getMessages().then(function (messages) {
            _this.messages = messages;
            _this.selectedMessage = _this.messages[1];
        });
    };
    EmailComponent.prototype.onSelect = function (message) {
        this.selectedMessage = message;
        if (this.isOver()) {
            this.isOpened = false;
        }
    };
    EmailComponent = __decorate([
        Component({
            selector: 'app-email',
            templateUrl: './email.component.html',
            styleUrls: ['./email.component.scss'],
            providers: [MailService]
        }),
        __metadata("design:paramtypes", [MailService])
    ], EmailComponent);
    return EmailComponent;
}());
export { EmailComponent };
//# sourceMappingURL=email.component.js.map