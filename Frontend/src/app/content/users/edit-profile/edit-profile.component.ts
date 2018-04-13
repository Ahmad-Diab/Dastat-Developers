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

  // onEdit(username : String = ''){

  //   this.usersService.editProile(username).subscribe((response) => {
  //     //event.confirm.resolve(response);
  //     console.log("onReserve order is met");
  //   });
  // }




}
