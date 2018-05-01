import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'angular2-cookie/services/cookies.service';
//import { SigninComponent } from '../../../content/users/signin/signin.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  home: boolean
  message;
  message2;
  Signed_in:boolean;
  constructor(private router: Router,public cookie: CookieService) {
    router.events.subscribe((url:any) => this.home = url.url === '/');
  }

  ngOnInit() {
   
    if (this.cookie.get("username")){
     this.message=this.cookie.get("username");
     this.Signed_in=true;
     this.message2="Book Ticket";
    
    }
    else {
      this.message = "Log In"; 
      this.Signed_in=false;
      this.message2="Register";
      
    }
  }

  name_or_signin(){
    if (this.message=="Log In"){
      console.log("click");
      window.open('/signin',"_self");
      this.ngOnInit();
    }
    else{
      window.open('user/'+this.cookie.get("username"),"_self");
      this.ngOnInit();
    }
  }

  log_out(){
    this.cookie.remove("username");
    window.open('/',"_self");
    this.ngOnInit();
  }
  Book_or_Register(){
    if (this.message2=="Book Ticket"){
      window.open('booking/parties',"_self");//Booking bage
    }
    else{
      window.open('/register',"_self")
      this.ngOnInit();
    }
  }
  signin(){
    if (this.message=="Log In"){
     window.open('/signin',"_self")
      this.ngOnInit();
    }
  }

}
