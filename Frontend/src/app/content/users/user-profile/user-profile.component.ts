import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../@services/users.service';
import { User } from '../../../@objects/user';
import { ActivatedRoute, Params } from '@angular/router';




@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


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

}
