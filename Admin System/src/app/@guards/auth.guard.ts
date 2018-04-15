import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor( private router: Router) {}

  canActivate() {
    let cookie: CookieService = new CookieService;
    var auth = <Auth>(cookie.getObject('auth'));

    if (auth.token == undefined) {
        this.router.navigate ( [ '/authentication/signin'  ] );
        return false;
    }else {
        return true;
    }
  }

  canActivateChild() {
    let cookie: CookieService = new CookieService;
    var auth = <Auth>(cookie.getObject('auth'));
    if (auth.token == undefined) {
        this.router.navigate ( [ '/authentication/signin'  ] );
        return false;
    }else {
        return true;
    }
  }

}

export class Auth {
    username: string;
    token: string;
}
