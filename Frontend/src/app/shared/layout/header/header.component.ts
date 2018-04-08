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
      this.router.navigate(['/signin']);
      this.ngOnInit();
    }
    else{
      this.router.navigate(['user/'+this.cookie.get("username")]);
      this.ngOnInit();
    }
  }

  log_out(){
    this.cookie.remove("username");
    this.router.navigate(['/']);
    this.ngOnInit();
  }
  Book_or_Register(){
    if (this.message2=="Book Ticket"){
      this.router.navigate(['']);//Booking bage
    }
    else{
      this.router.navigate(['/Register']);
      this.ngOnInit();
    }
  }
  signin(){
    if (this.message=="Log In"){
      this.router.navigate(['/signin']);
      this.ngOnInit();
    }
  }

}
