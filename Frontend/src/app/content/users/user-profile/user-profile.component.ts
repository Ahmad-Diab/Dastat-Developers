import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../@services/users.service';
import { User } from '../../../@objects/user';




@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  user: User;

  constructor(public usersService : UsersService) {

   }

  ngOnInit() {
    var data = {
      username: 'Lola_Wael'
    }

    this.usersService.viewMyInfo(data).subscribe((response) => {
      this.user = response;
    });
  }

}
