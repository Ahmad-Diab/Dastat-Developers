import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Router } from '@angular/router';
import { User } from '../../../@objects/user';
import { AuthService } from '../../../@services/auth.service';
import {HeaderComponent} from  '../../../shared//layout/header/header.component';
import {Location} from '@angular/common';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  
  user: User = new User();
  message;
  message2;
  forgotmypassword:boolean;
  loogedin:boolean;
  constructor(public cookie: CookieService, public router: Router,private location:Location, public authService: AuthService) { }

  ngOnInit() {
    this.forgotmypassword=false;
    if (this.cookie.get("username")){
      this.loogedin=true;
    }
    else{
      this.loogedin=false;
    }
  }
  onForgotmypassword(){
    if(!this.user.username){
      this.message = "please enter a username"
      return;
    }
    this.authService.forgotpassword(this.user).subscribe((response)=>{
      if(!response.success){
      this.message = response.msg;
      return;
    }
      else{
       this.message2=response.msg;    
      }

  });
}
  onLogin(){
    if(!this.user.username){
      this.message = "please enter a username"
      return;
    }

    if(!this.user.password){
      this.message = "please enter a password"
      return;
    }    
  
    this.authService.authenticateUser(this.user).subscribe((response)=>{
      if(!response.success){
      this.message = response.msg;
      return;
    }
      else{
        this.cookie.put('username',this.user.username);
       // this.message=response.msg;    
        this.load();
       
       // this.router.navigate(['']);
    

      }
  
        });
  }
  load(){
    location.reload();
    
  }
onForgotAction(){
  this.forgotmypassword=true;
  this.user=new User();
}
  

    
  
}
