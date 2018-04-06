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
        this.message=response.msg;

       // this.router.navigate(['']);
    

      }
        });
  }
  

    
  
}
