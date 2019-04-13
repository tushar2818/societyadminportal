import swal from 'sweetalert2';
import { SweetAlertType } from 'sweetalert2';
import { environment } from '../../environments/environment';

export enum DateFormat {
  DDMMYYYY = "DD/MM/YYYY",
  ddMMyyyy = "dd/MM/yyyy",

  MMDDYYYY = "MM/DD/YYYY",
  MMddyyyy = "MM/dd/yyyy"
}

export enum TimeFormat {
  HHmm = "HH:mm",
  hhmma = "hh:mm a"
}

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
  static BASE_API_ENDPOINT_IDENTITY = environment.BASE_API_ENDPOINT_IDENTITY;
  static BASE_API_ENDPOINT_CITY = environment.BASE_API_ENDPOINT_CITY;
  static BASE_API_ENDPOINT_SOCIETY = environment.BASE_API_ENDPOINT_SOCIETY;
  static DATE_FORMAT = environment.DATE_FORMAT;
  static DATE_FORMAT_PIPE = environment.DATE_FORMAT_PIPE;
  static TIME_FORMAT = environment.TIME_FORMAT;

  static UserDetailsKeyword = 'UserDetails';
  static IsUserLoggedIn = false;
  static UserID = '';
  static UserRole = '';
  static ClientID = 0;
  static CompanyID = 0; 
  static PersonID = 0; 
  static ProjectID = 0; 
  
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
      return "Error";
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

  //get current date in UTC
  static getCurrentDateInUTC(): number {
    try {
      var dateTemp = new Date();
      return this.getUTCDate(dateTemp);
    } catch (e) {
      CommonMethods.writeLogs(e, AlertType.Error);
    }
    return 0;
  }

  //utc number => date (Date format)
  static getDateFromUTC(utcnumber: any): Date {
    try {
      var myDate = new Date(utcnumber * 1000);
      return myDate;
    }
    catch (ex) { }
    return new Date();
  }

  //UTC time => local time (string format)
  static getLocalTimeFromUTC(utcTime: any): string {
    try {
      var myDate = new Date(utcTime * 1000);
      var dt = new moment(myDate, AppConstants.TIME_FORMAT, 'en');
      return dt.format(AppConstants.TIME_FORMAT, 'en');
    }
    catch (e) { CommonMethods.writeLogs(e, AlertType.Error); }
    return '';
  }

  // Date => UTC Start
  static getUTCStartDate(date: any): number {
    try {
      var dateTemp = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      return this.getUTCDate(dateTemp);
    } catch (e) {
      CommonMethods.writeLogs(e, AlertType.Error);
    }
    return 0;
  }

  static getUTCEndDate(date: any): number {
    try {
      var dateTemp = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);
      return this.getUTCDate(dateTemp);
    } catch (e) {
      CommonMethods.writeLogs(e, AlertType.Error);
    }
    return 0;
  }

  //Date => UTC
  static getUTCDate(date: any): number {
    try {
      return Math.round(date.getTime() / 1000.0);
    } catch (e) {
      CommonMethods.writeLogs(e, AlertType.Error);
    }
    return 0;
  }

  //Date => local date format string 
  public static getLocalDateFromDate(date: any): string {
    try {
      if (date != null) {
        var dateTemp = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        var dt = new moment(dateTemp);
        var targetDate = dt.format(AppConstants.DATE_FORMAT);
        return targetDate.toString();
      }
    } catch (e) {
    }
    return "";
  }

  //Date => updated date by number of days + -
  public static GetUpdateDate(date: any, numberOfDays: number): any {
    try {
      let dateTemp: Date;
      if (date != null) {
        dateTemp = new Date(date);
        dateTemp.setDate(date.getDate() + numberOfDays);
        return dateTemp;
      }
    } catch (e) {
    }
    return "";
  }

  // local time => UTC
  static getUTCFromLocalTime(localTime: any): number {
    try {
      var hour = -1;
      var min = -1;
      var sec = -1;
      var milisec = -1;
      var AmPm = '-';
      switch (AppConstants.TIME_FORMAT) {
        case TimeFormat.hhmma:
          var all = localTime.split(":");
          var amPm = all[1].split(" ");
          if (amPm[1] == "AM") {
            hour = all[0];
            min = amPm[0];
          }
          else if (amPm[1] == "PM") {
            hour = parseInt(all[0]) + 12;
            min = amPm[0];
          }
          if (hour != -1 && min != -1) {
            var defDate = new Date();
            var defDate2 = new Date(defDate.getFullYear(), defDate.getMonth(), defDate.getDate(), hour, min);
            return CommonMethods.getUTCDate(defDate2);
          }
          break;
        case TimeFormat.HHmm:
          var all = localTime.split(":");
          hour = all[0];
          min = all[1];
          if (hour != -1 && min != -1) {
            var defDate = new Date();
            var defDate2 = new Date(defDate.getFullYear(), defDate.getMonth(), defDate.getDate(), hour, min);
            return CommonMethods.getUTCDate(defDate2);
          }
          break;
        default:
      }
    }
    catch (e) {
      CommonMethods.writeLogs(e, AlertType.Error);
    }
    return 0;
  }
}

export enum ActionMode {
  add = 'add',
  edit = 'edit'
}

export enum LogType {
  Role = "Role",
  User = "User",
  City = "City",
  CompanyMaster = "Company Master",
  DesignationMaster = "Designation Master",
  DesignationType = "Designation Type",
  DesignationTypeMapping = "Designation Type Mapping",
  EmployeeMaster = "Employee Master",
  FlatMaster = "Flat Master",
  FlatOwnerHistory = "Flat Owner History",
  FlatTypeMaster = "Flat Type Master",
  FloorMaster = "Floor Master",
  ClientMaster = "Client Master",
  ProjectEmployee = "Project Employee",
  ProjectMaster = "Project Master",
  SocietyMaster = "Society Master",
  WingMaster = "Wing Master"
}

export enum LogAction {
  GetAll = "Gel All",
  GetById = "Gel By Id",
  Add = "Add",
  Update = "Update",
  Delete = "Delete",
  GetAllLookups = "Gel All Lookups",
  Save = "Save"
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

export enum Roles {
  SuperAdmin = "Super Admin",
  Admin = "Admin",
  Client = "Client" 
}

export enum LookupType {
  AllDesignationTypes = 'AllDesignationTypes',
  AllDesignations = 'AllDesignations',
  AllDesignationTypesMappings = 'AllDesignationTypesMappings',
  LoggedInUserDetails = 'LoggedInUserDetails',
  AllClients = 'AllClients',
  AllCompanies = 'AllCompanies',
  AllBuildings = "AllBuildings"
} 


