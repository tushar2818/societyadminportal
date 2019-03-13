import swal from 'sweetalert2';
import { SweetAlertType } from 'sweetalert2';
import { Headers } from '@angular/http';

export enum CityType {
  State = 'State',
  District = 'District',
  Taluka = 'Taluka',
  Village = 'Village',
  Area = 'Area',
  Address = 'Address',
  CityType = 'CityType'
}

export class AppConstants {

  //api details
  public static BASE_API_ENDPOINT_IDENTITY = 'http://localhost:31713/api/';
  public static BASE_API_ENDPOINT_CITY = 'http://localhost:31497/api/';

  static getHeaderStringIDENTITY(): Headers {
    let headerStringIdentity = {
      'Content-Type': 'application/json',
      'ApplicationId': 1,
      'ApplicationToken': 2
    };
    return new Headers(headerStringIdentity);
  };

  public static getHeaderStringCity(): Headers {
    let headerStringCity = {
      'Content-Type': 'application/json',
      'ApplicationId': 1,
      'ApplicationToken': 2
    };
    return new Headers(headerStringCity);
  };

  static defaultModalconfig = {
    //backdrop: false,
    ignoreBackdropClick: true,
    keyboard: false
  };

  static cityTypes = [
    { Id: 1, Type: 'State', cityType: CityType.State },
    { Id: 2, Type: 'District', cityType: CityType.District },
    { Id: 3, Type: 'Taluka', cityType: CityType.Taluka },
    { Id: 4, Type: 'Village', cityType: CityType.Village },
    { Id: 5, Type: 'Area', cityType: CityType.Area },
    { Id: 6, Type: 'Address', cityType: CityType.Address }
  ];

  static GetCityTypeIdFromUniqueKey(uniqueKey: string): number {
    let type = AppConstants.cityTypes.filter(function (o) { return o.cityType == uniqueKey; })[0];
    if (type != null)
      return type.Id;
    return -1;
  }

}

export class CommonMethods {

  //handle api response and disply messages according to response status
  static handleApiResponse(response: any, logAction: LogAction, successTitle: string = "",
    errorTitle: string = "", alertMessage: string = "") {
    if (response == null) {
      CommonMethods.writeLogs(AlertType.Error, "'" + logAction + "' returns null response" );
    }
    else if (!response.IsSuccess) {
      CommonMethods.showMessage(CommonMethods.getErrorStringFromListOfErrors(response), AlertType.Error, errorTitle);
    }
    else if (logAction == LogAction.Add || logAction == LogAction.Update || logAction == LogAction.Delete) {
      let message = alertMessage != null && alertMessage != "" ? alertMessage :
        response.DisplayMessage == null ? "" : response.DisplayMessage;
      CommonMethods.showMessage(message, AlertType.Success, successTitle);
    }
  }

  //get error string from array of strings
  static getErrorStringFromListOfErrors(response: any) {
    if (response.ErrorMessages == null)
      return "";
    let errors = response.ErrorMessages.map(data => data.Message);
    return errors.toString();
  }

  //write logs
  static writeLogs(alertType: AlertType, message: any) {
    console.log('------------------------------------- ' + alertType + ' -------------------------------------');
    console.log(JSON.stringify(message));
    console.log('---------------------------------------------------------------------------------------------');
  } 

  //model default setting
  static addDefaultModalSettings() {
    $('.modal-dialog').addClass('modal-lg');
    $('.modal-dialog').addClass('modal-primary');
  }

  //apply data table style
  static applyDataTableStyles(datatableId: string = 'datatables') {
    try {
      $('#' + datatableId).DataTable().clear();
      $('#' + datatableId).DataTable().destroy();
    } catch (e) {
    }
    setTimeout(CommonMethods.AfterDataPopulated, 50, datatableId);
  }
  static AfterDataPopulated(datatableId: string) {    
    $('#' + datatableId).DataTable();
  }

  //show message
  static showMessage(message: string, alertType: AlertType, title: string) {
    let icon = alertType == AlertType.Success ? 'success' : alertType == AlertType.Error ? 'error' : 'warning';
    swal.fire(
      title == "" ? alertType.toString() : title,
      message,
      icon as SweetAlertType
    );
  }

  //get duplicate copy of same object
  static getDeepCopy(data: any): any {
    try {
      return JSON.parse(JSON.stringify(data));
    } catch (e) {
      this.writeLogs(AlertType.Error, e);
    }
    return "";
  }

}

export enum ActionMode {
  add = 'add',
  edit = 'edit'
}

export enum LogType {
  Role = "Role",
  City = "City"
}

export enum LogAction {
  GetAll = "Gel All",
  GetById = "Gel By Id",
  Add = "Add",
  Update = "Update",
  Delete = "Delete"
}

export enum AlertType {
  Success = "Success",
  Error = "Error",
  Warning = "Warning"
}

export enum ApiType {
  GetAll = "Gel All",
  GetById = "Gel By Id",
  Post = "Post",
  Delete = "Delete"
}
