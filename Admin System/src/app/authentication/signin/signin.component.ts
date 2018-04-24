import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../@services/auth.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  username: string;
  password: string;
  message: string;

  public form: FormGroup;
  constructor(private fb: FormBuilder, 
    private router: Router,
    private cookie: CookieService,
    private authService: AuthService) {}

  ngOnInit() {
    this.form = this.fb.group ( {
      uname: [null , Validators.compose ( [ Validators.required ] )] , password: [null , Validators.compose ( [ Validators.required ] )]
    } );
  }

  onSubmit() {

    var data = {
      username: this.username,
      password: this.password
    }

    this.authService.login(data).subscribe((response) => {
      var auth = {
        username: response.username,
        type: response.type,
        token: response.data
      }

      this.cookie.putObject('auth', auth);
      this.router.navigate ( [ '/' ] );
    }, (error) => {
      this.message = 'username or password are wrong, try again!'
    });
  }

}
