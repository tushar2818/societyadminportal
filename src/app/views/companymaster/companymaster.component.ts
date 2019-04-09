import { Component, TemplateRef } from '@angular/core';
import { AppConstants, AlertType, CommonMethods, ApiType, LogAction, LogType, ActionMode } from '../../shared/appconstants';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { GlobalService } from '../../shared/global.service';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { CompanyMasterService } from './companymaster.service';

@Component({
  templateUrl: 'companymaster.component.html'
})

export class CompanyMasterComponent {
  subscription: Subscription;
  modalRef: BsModalRef;
  modelHeaders: any = [];
  model: any;
  modellist: any = [];
  modelOld: any;
  isModelEditable: boolean;
  mode: ActionMode = ActionMode.add;
  logType: LogType = LogType.FloorMaster;
  uniqueKey: any = "CompanyMasterID";
  pageTitleKey: any = "PageTitles.CompanyMaster";

  //constructor 
  constructor(
    private service: CompanyMasterService,
    private modalService: BsModalService,
    private globalService: GlobalService) {
  }

  //initilization
  ngOnInit() {
    try {
      this.modelHeaders = ["TableHeaders.CompanyName", "TableHeaders.Email", "TableHeaders.Mobile",
        "TableHeaders.Address"];
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

  //save/update model
  onSave(isValid: boolean) {
    if (isValid) {
      this.globalService.showLoading(true);
      this.subscription = this.service.save(this.model).subscribe(response => {
        try {
          let auditLogAction = this.mode == ActionMode.add ? LogAction.Add : LogAction.Update;
          this.globalService.handleApiResponse(response, this.logType, auditLogAction, this.pageTitleKey,
            this.model, this.modelOld, true);
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
      CommonMethods.writeLogs(AlertType.Warning, "Invallid form");
    }
  }

  //delete confirmation
  onDelete() {
    swal.fire(this.globalService.getConfirmationSetting(this.pageTitleKey)).then(function (result) {
      if (result) {
        this.performDelete();
      }
    }.bind(this), function (dismiss) {
    });
  }

  //delete model
  performDelete() {
    this.globalService.showLoading(true);
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
