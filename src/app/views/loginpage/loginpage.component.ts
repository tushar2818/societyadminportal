import { Component } from '@angular/core';
import { GlobalService } from '../../shared/global.service';
import { Subscription } from 'rxjs';
import { CommonMethods, AlertType, AppConstants } from '../../shared/appconstants';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'loginpage.component.html'
})

export class LoginPageComponent {

  model: any = {};
  subscription: Subscription;

  //constructor 
  constructor(private globalService: GlobalService,
    private router: Router) {
  }

  //initilization
  ngOnInit() {
  }

  //validate user
  validateUser(isVallid) {

    if (!isVallid)
      return;

    this.globalService.showLoading(true);

    this.subscription = this.globalService.validateUser(this.model).subscribe(response => {
      try {
        if (response != null) {
          if (response.IsSuccess) {
            localStorage.setItem(AppConstants.UserDetailsKeyword, JSON.stringify(response.Result));
            this.globalService.setUserData(); 
            this.router.navigate(['/dashboard']);  
          }
          else {
            CommonMethods.showMessage(CommonMethods.getErrorStringFromListOfErrors(response),
              AlertType.Error, "Error");
          }
        }
        this.globalService.showLoading(false);
      } catch (e) {
        this.globalService.handleExceptions(e);
      }
    }, error => { this.globalService.handleApiError(error); });
  }

}
