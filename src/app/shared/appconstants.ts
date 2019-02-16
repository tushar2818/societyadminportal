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

  static getHeaderStringAuditLog(): Headers {
    let headerStringIdentity = {
      'Content-Type': 'application/json',
      'ApplicationId': 1,
      'ApplicationToken': 2
    };
    return new Headers(headerStringIdentity);
  };

  //common titles
  static TEXT_ERROR = "Error";
  static TEXT_ERROR_API = "Api or Internet Connection is not available";
  static TEXT_CONFIRM_TITLE = "Are you sure?";
  static TEXT_CONFIRM_MESSAGE = "You won't be able to revert this";
  static TEXT_CONFIRM_DELETE = "Yes, delete it";

  static defaultModalconfig = {
    //backdrop: false,
    ignoreBackdropClick: true,
    keyboard: false
  };

}

export class CommonMethods {

  static handleApiResponse(apiType: ApiType, response: any) {
    if (response == null) {
      CommonMethods.showMessage("'" + apiType + "' returns null response", AlertType.Error);
    }
    else if (!response.IsSuccess) {
      CommonMethods.showMessage(CommonMethods.getErrorStringFromListOfErrors(response.ErrorMessages), AlertType.Error);
    }
    else if (apiType == ApiType.Delete || apiType == ApiType.Post) {
      CommonMethods.showMessage(response.DisplayMessage == null ? "" : response.DisplayMessage);
    }
  }

  static getErrorStringFromListOfErrors(ErrorMessages: any) {
    if (ErrorMessages == null)
      return "";
    let errors = ErrorMessages.map(data => data.Message);
    return errors.toString();
  }

  static writeLogs(alertType: AlertType, message: any) {
    console.log('------------------------------------- ' + alertType + ' -------------------------------------');
    console.log(JSON.stringify(message));
    console.log('---------------------------------------------------------------------------------------------');
  } 

  static addDefaultModalSettings() {
    $('.modal-dialog').addClass('modal-lg');
    $('.modal-dialog').addClass('modal-primary');
  }

  static applyDataTableStyles(datatableId: string = 'datatables') {
    setTimeout(CommonMethods.AfterDataPopulated, 50, datatableId);
  }

  static AfterDataPopulated(datatableId: string) {
    $('#' + datatableId).DataTable();
  }

  static showMessage(message: string, alertType: AlertType = AlertType.Success) {
    let icon = alertType == AlertType.Success ? 'success' : alertType == AlertType.Error ? 'error' : 'warning';
    swal.fire(alertType.toString(), message, icon as SweetAlertType);
  }

  static getDeepCopy(data: any): any {
    try {
      return JSON.parse(JSON.stringify(data));
    } catch (e) {
      this.writeLogs(AlertType.Error, e);
    }
    return "";
  }

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
  Warning = "Warning",
  Info = "Info"
}

export enum ApiType {
  GetAll = "Gel All",
  GetById = "Gel By Id",
  Post = "Post",
  Delete = "Delete"
}
