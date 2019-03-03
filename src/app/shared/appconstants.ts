import swal from 'sweetalert2';
import { SweetAlertType } from 'sweetalert2';
import { Headers } from '@angular/http';

export class AppConstants {

  //api details
  public static BASE_API_ENDPOINT_IDENTITY = 'http://localhost:31713/api';
  public static BASE_API_ENDPOINT_AUDIT_LOG = 'http://localhost:31713/api';

  static getHeaderStringIDENTITY(): Headers {
    let headerStringIdentity = {
      'Content-Type': 'application/json',
      'ApplicationId': 1,
      'ApplicationToken': 2
    };
    return new Headers(headerStringIdentity);
  };

  static defaultModalconfig = {
    //backdrop: false,
    ignoreBackdropClick: true,
    keyboard: false
  };

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
  static getErrorStringFromListOfErrors(ErrorMessages: any) {
    if (ErrorMessages == null)
      return "";
    let errors = ErrorMessages.map(data => data.Message);
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
  Role = "Role"
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
