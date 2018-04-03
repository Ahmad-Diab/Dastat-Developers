import { Component, OnInit } from '@angular/core';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { Router } from '@angular/router';
import { User } from '../../../@objects/user';
import { AuthService } from '../../../@services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  
  user: User = new User();
  message;
  constructor(public cookie: CookieService, public router: Router, public authService: AuthService) { }

  ngOnInit() {
    console.log('reach login');
  }
  onLogin(){
    console.log(this.user);
    if(!this.user.username){
      this.message = "please enter a username"
      return;
    }

    if(!this.user.password){
      this.message = "please enter a password"
      return;
    }    
    this.cookie.put('username', this.user.username);
    this.authService.authenticateUser(this.user).subscribe((response)=>{
      if(!response.success){
      this.message = "username or passsword is incorrect"
      return;}
      else{
        this.router.navigate(['']);

      }
        });
  }
  
  onRegister(){
    
    if(!this.user.username){
      this.message = "please enter a username"
      return;
    }

    if(!this.user.password){
      this.message = "please enter a password"
      return;
    }   
    
    if(!this.user.name){
      this.message = "please enter a fullname"
      return;
    }

    if(!this.user.email){
      this.message = "please enter an email"
      return;
    }

    this.cookie.put('username', this.user.username);
    this.authService.register(this.user).subscribe((response)=>{
      if(!response.success){
      this.message = "please enter the correct data"
      return;}

      else{
        this.router.navigate(['']);

      }
        });
    
  }

}
