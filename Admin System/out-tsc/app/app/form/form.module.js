var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { TreeModule } from 'angular-tree-component';
import { CustomFormsModule } from 'ng2-validation';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { FormRoutes } from './form.routing';
import { BasicComponent } from './basic/basic.component';
import { MasksComponent } from './masks/masks.component';
import { EditorComponent } from './editor/editor.component';
import { ValidationComponent } from './validation/validation.component';
import { UploadComponent } from './upload/upload.component';
import { FormTreeComponent } from './tree/tree.component';
var FormModule = (function () {
    function FormModule() {
    }
    FormModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule.forChild(FormRoutes),
                FormsModule,
                ReactiveFormsModule,
                NgbProgressbarModule,
                CustomFormsModule,
                TreeModule,
                TextMaskModule,
                FileUploadModule
            ],
            declarations: [BasicComponent, MasksComponent, EditorComponent, ValidationComponent, UploadComponent, FormTreeComponent]
        })
    ], FormModule);
    return FormModule;
}());
export { FormModule };
//# sourceMappingURL=form.module.js.map