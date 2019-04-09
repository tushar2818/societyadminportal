// auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { GlobalService } from './shared/global.service';
import { AppConstants } from './shared/appconstants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private globalService: GlobalService,
    private router: Router) { }

  canActivate() {
    if (!AppConstants.IsUserLoggedIn) {
      //try one more time
      this.globalService.setUserData();
      if (!AppConstants.IsUserLoggedIn) {
        //still not logged in
        this.router.navigate(['/loginpage']);
        return false;
      }
    }
    return true;
  }

}
