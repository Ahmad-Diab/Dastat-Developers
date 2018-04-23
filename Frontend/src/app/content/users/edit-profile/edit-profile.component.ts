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
  
    }




}
