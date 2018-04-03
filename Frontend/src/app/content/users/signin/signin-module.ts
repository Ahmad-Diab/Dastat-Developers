import { NgModule } from '@angular/core';
import { SigninComponent } from './signin.component';
import { SigninRoutingModule } from './signin-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SigninRoutingModule,
    FormsModule
  ],
  declarations: [SigninComponent]
})
export class AuthModule { }