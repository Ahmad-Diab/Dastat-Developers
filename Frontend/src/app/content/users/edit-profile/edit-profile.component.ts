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
  
    if(email == ""){
      email = this.user.email;
    }
    if(first_name == ""){
      first_name = this.user.first_name;
    }
    if(last_name == ""){
      last_name = this.user.last_name;
    }
    if(phone_number == 0){
      phone_number = this.user.phone_number;
    }
    if(age == 0){
      age = this.user.age;
    }
        this.usersService.editProfile(email, first_name,last_name,phone_number,age,this.username).subscribe((response)=>{
  
            this.ngOnInit();
  
          });  

          
  
    }




}
