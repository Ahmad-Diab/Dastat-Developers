import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../@services/auth.service';
import { User } from '../../../@objects/user';
@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
 username;
  token;
  message;
  constructor(public router: Router,public authService:AuthService) { }

 
  ngOnInit() {
  }
  onVerify(){
    if (!this.token){
      this.message="please Enter the code";
      return;
    }
    if(!this.username){
      this.message = "please enter a username"
      return;
    }
  //  console.log(this.username);
  // console.log(this.token);
    this.authService.verify(this.username,this.token).subscribe((response)=>{
     
      this.message = response.msg;
      return;
  
    });


}
}
