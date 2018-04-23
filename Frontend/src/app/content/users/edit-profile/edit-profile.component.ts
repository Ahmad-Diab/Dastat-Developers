import { Component, OnInit } from '@angular/core';
import { User } from '../../../@objects/user';
import { UsersService } from '../../../@services/users.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {


  user: User;
  username: string;
  message;
  

  constructor(public usersService : UsersService,
  public route: ActivatedRoute) {
    this.route.params.subscribe((params: Params )=> {
      this.username = params['username'];
    });
   }

  ngOnInit() {
    var data = {
      username: this.username
    }

    this.usersService.viewMyInfo(data).subscribe((response) => {
      this.user = response;
    });
  }

  //--------------- edit profile mail, first & last name, phone, age using username as id----------------
  onEdit(email: string, first_name: string, last_name: string, phone_number: number, age: number){
  
        this.usersService.editProfile(email, first_name,last_name,phone_number,age,this.username).subscribe((response)=>{
  
            this.ngOnInit();
  
          });  

          if (!this.user.username){
            this.message="please Enter a Username";
            return;
          }
          if(!this.user.password){
            this.message = "please enter a password"
            return;
          }
      
          if(!this.user.email){
            this.message = "please enter an Email"
            return;
          }   
          if(!this.user.first_name){
            this.message = "please enter your First name"
            return;
          }
          if(!this.user.last_name){
            this.message = "please enter your last name"
            return;
          }
      
          if(!this.user.gender){
            this.message = "please enter your Gender"
            return;
          }
          if(!this.user.age){
            this.message = "please enter your age"
            return;
          }
  
    }




}
