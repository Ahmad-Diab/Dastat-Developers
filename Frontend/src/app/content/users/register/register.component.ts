import { Component, OnInit } from '@angular/core';
import { User } from '../../../@objects/user';
import { Router } from '@angular/router';
import { AuthService } from '../../../@services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User;
  message;

  constructor(public router: Router,public authService:AuthService) { }

  ngOnInit() {
    this.user.gender = "gender";

  }
  onRegister(){
    console.log("hii");
    if (!this.user.username){
      this.message="please Enter a Username";
      return;
    }
    if(!this.user.password){
      this.message = "please enter a password"
      return;
    }

    if(!this.user.email){
      this.message = "please enter a Email"
      return;
    }   
    if(!this.user.first_name){
      this.message = "please enter your Firstt name"
      return;
    }
    if(!this.user.last_name){
      this.message = "please enter your last name"
      return;
    }

    if(!this.user.gender || this.user.gender === "gender"){
      this.message = "please enter your Gender"
      return;
    }
    if(!this.user.age){
      this.message = "please enter your age"
      return;
    }

    this.authService.register(this.user).subscribe((response)=>{
      if(!response.success){
      this.message = response.msg;
  
      return;}

      else{  

        this.message = response.msg;
        return;
      }
    })


  }
  

}
