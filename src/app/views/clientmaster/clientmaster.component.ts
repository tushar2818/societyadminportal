import { Component, TemplateRef } from '@angular/core';
import { AppConstants, AlertType, CommonMethods, ApiType, LogAction, LogType, ActionMode, Roles } from '../../shared/appconstants';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { ClientMasterService } from './clientmaster.service';
import { GlobalService } from '../../shared/global.service';

@Component({
  templateUrl: 'clientmaster.component.html'
})

export class ClientMasterComponent {
  subscription: Subscription;
  modalRef: BsModalRef;
  modelHeaders: any = [];
  model: any;
  modellist: any = [];
  modelOld: any;
  isModelEditable: boolean;
  mode: ActionMode = ActionMode.add;
  logType: LogType = LogType.ClientMaster;
  uniqueKey: any = "ClientMasterID";
  pageTitleKey: any = "PageTitles.ClientMaster";

  //constructor 
  constructor(
    private service: ClientMasterService,
    private modalService: BsModalService,
    private globalService: GlobalService) {
  }

  //initilization
  ngOnInit() {
    try {
      this.modelHeaders = ["TableHeaders.ClientName", "TableHeaders.Email", "TableHeaders.Mobile", "TableHeaders.VallidFrom","TableHeaders.VallidTill", "TableHeaders.CompanyLimit",
        "TableHeaders.ProjectLimit", "TableHeaders.Active", "TableHeaders.Deleted"];
      this.refresh();
    } catch (e) {
      this.globalService.handleExceptions(e);
    }
  }

  //refresh data
  refresh() {
    this.globalService.showLoading(true);
    this.modellist = [];
    this.onCancelPopup();
    this.isModelEditable = false;
    this.subscription = this.service.getall().subscribe(response => {
      try {
        this.globalService.handleApiResponse(response, this.logType, LogAction.GetAll);
        if (response != null && response.IsSuccess) {
          this.modellist = response.Result;
          CommonMethods.applyDataTableStyles();
        }
        this.globalService.showLoading(false);
      } catch (e) {
        this.globalService.handleExceptions(e);
      }
    }, error => { this.globalService.handleApiError(error); });
  }

  //open popup of save/update
  onOpenPopup(template: TemplateRef<any>, model: any = null) {
    this.modelOld = {};
    this.model = {};
    if (model == null) {
      this.mode = ActionMode.add;
      this.isModelEditable = true;
      this.modalRef = this.modalService.show(template, AppConstants.defaultModalconfig);
      CommonMethods.addDefaultModalSettings();
    }
    else {
      this.mode = ActionMode.edit;
      this.globalService.showLoading(true);
      this.subscription = this.service.getById(model[this.uniqueKey]).subscribe(response => {
        try {
          if (response != null && response.IsSuccess) {
            this.isModelEditable = false;
            this.model = response.Result;
            this.modelOld = CommonMethods.getDeepCopy(this.model);
            this.setDateTime(true);
            this.modalRef = this.modalService.show(template, AppConstants.defaultModalconfig);
            CommonMethods.addDefaultModalSettings();
          }
          this.globalService.handleApiResponse(response, this.logType, LogAction.GetById, this.pageTitleKey,
            this.model);
          this.globalService.showLoading(false);
        } catch (e) {
          this.onCancelPopup();
          this.globalService.handleExceptions(e);
        }
      }, error => {
        this.onCancelPopup();
        this.globalService.handleApiError(error);
      });
    }
  }

  saveClient() {
    this.subscription = this.service.save(this.model).subscribe(response => {
      try {
        let auditLogAction = this.mode == ActionMode.add ? LogAction.Add : LogAction.Update;
        this.globalService.handleApiResponse(response, this.logType, auditLogAction, this.pageTitleKey,
          this.model, this.modelOld, true);
        if (response != null && response.IsSuccess) {
          this.refresh();
        }
        else {
          this.setDateTime(true);
          this.globalService.showLoading(false);
        }
      } catch (e) {
          this.setDateTime(true);
        this.globalService.handleExceptions(e);
      }
    }, error => {
          this.setDateTime(true);
      this.globalService.handleApiError(error);
    });
  }

  //save/update model
  onSaveConfirm(isValid: boolean) {
    swal.fire(this.globalService.getConfirmationSetting(this.pageTitleKey, LogAction.Save)).
      then(function (result) {
        if (result.value) {
          this.onSave(isValid);
        }
      }.bind(this), function (dismiss) {
      });
  }

  onSave(isValid: boolean) {
    if (isValid) {
      this.setDateTime();
      this.globalService.showLoading(true);

      this.model.UserName = this.model.Email;
      this.model.PhoneNumber = this.model.Mobile;
      this.model.PasswordHash = 'Ini1234*';//password will not be consider in case of update
      this.model.RoleName = Roles.Client;
      this.model.Id = this.model.UserID;

      debugger;
      this.subscription = this.globalService.saveUpdateUser(this.model).subscribe(response => {
        try {
          if (response != null && response.IsSuccess) {
            //user saved successfully
            this.globalService.keepAuditLogs(LogType.User, LogAction.Add, this.model);
            this.model.UserID = response.Result.Id;
            this.saveClient();
          }
          else {
            let errors = CommonMethods.getErrorStringFromListOfErrors(response);
            let errorTitle = this.globalService.getTranslate("AlertTitle.Error");
            CommonMethods.showMessage(errors, AlertType.Error, errorTitle);
            this.setDateTime(true);
            this.globalService.showLoading(false);
          }
        } catch (e) {
          this.setDateTime(true);
          this.globalService.handleExceptions(e);
        }
      }, error => {
        this.setDateTime(true);
        this.globalService.handleApiError(error);
      });
    }
    else {
      CommonMethods.writeLogs(AlertType.Warning, "Invallid form");
    }
  }

  //date time conversion
  setDateTime(isShowOnPage: boolean = false) {
    try {
      if (isShowOnPage) {
        this.model.VallidFrom = CommonMethods.getDateFromUTC(this.model.VallidFrom);
        this.model.VallidTill = CommonMethods.getDateFromUTC(this.model.VallidTill); 
      }
      else {
        this.model.VallidFrom = CommonMethods.getUTCStartDate(this.model.VallidFrom);
        this.model.VallidTill = CommonMethods.getUTCStartDate(this.model.VallidTill); 
      }
    } catch (e) {
      CommonMethods.writeLogs(e, AlertType.Error);
    }
  }

  //delete confirmation
  onDelete() {
    swal.fire(this.globalService.getConfirmationSetting(this.pageTitleKey)).then(function (result) {
      if (result.value) {
        this.performDelete();
      }
    }.bind(this), function (dismiss) {
    });
  }

  //delete model
  performDelete() {
    this.globalService.showLoading(true);

    //delete user first
    this.subscription = this.globalService.deleteUser(this.model.UserID).subscribe(response => {
      try {

        if (response != null && response.IsSuccess) {
          //user deleted successfully
          this.globalService.keepAuditLogs(LogType.User, LogAction.Delete, this.model);
          //then delete it from client master table
          this.subscription = this.service.delete(this.model[this.uniqueKey]).subscribe(response => {
            try {
              this.globalService.handleApiResponse(response, this.logType, LogAction.Delete, this.pageTitleKey, this.model, null, true);
              if (response != null && response.IsSuccess) {
                this.refresh();
              }
              else {
                this.globalService.showLoading(false);
              }
            } catch (e) {
              this.globalService.handleExceptions(e);
            }
          }, error => { this.globalService.handleApiError(error); }); 
        }
        else {
          let errors = CommonMethods.getErrorStringFromListOfErrors(response);
          let errorTitle = this.globalService.getTranslate("AlertTitle.Error");
          CommonMethods.showMessage(errors, AlertType.Error, errorTitle);
          this.globalService.showLoading(false);
        }
      } catch (e) {
        this.globalService.handleExceptions(e);
      }
    }, error => { this.globalService.handleApiError(error); });
  }

  onEdit() {
    this.isModelEditable = true;
  }

  //cancel save/update popup
  onCancelPopup(forceExecute: boolean = true) {
    try {
      if (this.modalRef != null)
        this.modalRef.hide();
    } catch (e) {
      CommonMethods.writeLogs(AlertType.Error, e);
    }
  }

}
