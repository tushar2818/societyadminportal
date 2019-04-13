import { Component } from '@angular/core';
import { GlobalService } from '../../shared/global.service';
import { Subscription } from 'rxjs';
import { CommonMethods, AlertType, AppConstants, LookupType, Roles } from '../../shared/appconstants';
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

    //validate user credential
    this.subscription = this.globalService.validateUser(this.model).subscribe(response => {
      try {
        if (response != null) {
          debugger;

          if (response.IsSuccess && response.Result != null) { 

            let userResult = response.Result;

            //get user details
            let userRole = userResult.Roles[0]; 

            //if user is client
            if (userRole == Roles.SuperAdmin || userRole == Roles.Admin ) {

              this.navigateToDashBoard(userResult);

            } 
            else if (userRole == Roles.Client) {

              let userId = userResult.ApplicationUserDTO.Id;

              let allLookupKeys = [
                {
                  LookupType: LookupType.LoggedInUserDetails, Parameters: [
                    { Key: 'UserID', Value: userId }]
                }
              ];

              this.subscription = this.globalService.getallLookups(allLookupKeys).subscribe(userResponse => {
                try {
                  if (userResponse != null && userResponse.IsSuccess && userResponse.Result != null) {

                    let result = userResponse.Result;

                    let userDetails = result.filter(s => s.LookupType == LookupType.LoggedInUserDetails)[0].Data;

                    userResult.UserDetails = userDetails;

                    this.navigateToDashBoard(userResult);

                  }
                  else {
                    //show error messages
                    CommonMethods.showMessage(CommonMethods.getErrorStringFromListOfErrors(userResponse),
                      AlertType.Error, 'Error');
                  }
                  this.globalService.showLoading(false);
                } catch (e) {
                  this.globalService.handleExceptions(e);
                }
              }, error => { this.globalService.handleApiError(error); }); 
            }
          }
          else {
            CommonMethods.showMessage(CommonMethods.getErrorStringFromListOfErrors(response),
              AlertType.Error, "Error");
            this.globalService.showLoading(false);
          }
        }
      } catch (e) {
        this.globalService.handleExceptions(e);
      }
    }, error => { this.globalService.handleApiError(error); });
  }

  navigateToDashBoard(userResult) {

    if (userResult != null) {

      localStorage.setItem(AppConstants.UserDetailsKeyword, JSON.stringify(userResult));

      this.globalService.setUserData();

      this.router.navigate(['/dashboard']);

    }
  }

}
