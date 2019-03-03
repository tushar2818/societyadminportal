import { Component, TemplateRef } from '@angular/core';
import { AppConstants, AlertType, CommonMethods, ApiType, LogAction, LogType, ActionMode } from '../../shared/appconstants';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AppService } from '../../app.service';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { RolesService } from './roles.service';

@Component({
  templateUrl: 'roles.component.html'
})

export class RolesComponent {
  subscription: Subscription;
  modalRef: BsModalRef;
  modelHeaders: any = [];
  model: any;
  modellist: any = [];
  modelOld: any;
  isModelEditable: boolean;
  mode: ActionMode = ActionMode.add;
  logType: LogType = LogType.Role;
  uniqueKey: any = "Id";
  pageTitleKey: any = "PageTitles.Role";

  //constructor 
  constructor(
    private service: RolesService,
    private modalService: BsModalService,
    private appService: AppService) {
  }

  //initilization
  ngOnInit() {
    try {
      this.modelHeaders = [this.appService.getTranslate("TableHeaders.Role"),
      this.appService.getTranslate("TableHeaders.NormalizedRole"),
      this.appService.getTranslate("TableHeaders.ConcurrencyStamp")];
      this.refresh();
    } catch (e) {
      this.appService.handleExceptions(e);
    }
  }

  //refresh data
  refresh() {
    this.appService.showLoading(true);
    this.modellist = [];
    this.onCancelPopup();
    this.isModelEditable = false;
    this.subscription = this.service.getall().subscribe(response => {
      try {
        this.appService.handleApiResponse(response, this.logType, LogAction.GetAll);
        if (response != null && response.IsSuccess) {
          this.modellist = response.Result;
          CommonMethods.applyDataTableStyles();
        }
        this.appService.showLoading(false);
      } catch (e) {
        this.appService.handleExceptions(e);
      }
    }, error => { this.appService.handleApiError(error); });
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
      this.appService.showLoading(true);
      this.subscription = this.service.getById(model[this.uniqueKey]).subscribe(response => {
        try {
          if (response != null && response.IsSuccess) {
            this.isModelEditable = false;
            this.model = response.Result;
            this.modelOld = CommonMethods.getDeepCopy(this.model);
            this.modalRef = this.modalService.show(template, AppConstants.defaultModalconfig);
            CommonMethods.addDefaultModalSettings();
          }
          this.appService.handleApiResponse(response, this.logType, LogAction.GetById, this.pageTitleKey,
            this.model);
          this.appService.showLoading(false);
        } catch (e) {
          this.onCancelPopup();
          this.appService.handleExceptions(e);
        }
      }, error => {
        this.onCancelPopup();
        this.appService.handleApiError(error);
      });
    }
  }

  //save/update model
  onSave(isValid: boolean) {
    if (isValid) {
      this.appService.showLoading(true);
      this.subscription = this.service.save(this.model).subscribe(response => {
        try {
          let auditLogAction = this.mode == ActionMode.add ? LogAction.Add : LogAction.Update;
          this.appService.handleApiResponse(response, this.logType, auditLogAction, this.pageTitleKey,
            this.model, this.modelOld, true);
          if (response != null && response.IsSuccess) {
            this.refresh();
          }
          else {
            this.appService.showLoading(false);
          }
        } catch (e) {
          this.appService.handleExceptions(e);
        }
      }, error => { this.appService.handleApiError(error); });
    }
    else {
      CommonMethods.writeLogs(AlertType.Warning, "Invallid form");
    }
  }

  //delete confirmation
  onDelete() {
    swal.fire(this.appService.getDeleteConfirmationSetting(this.pageTitleKey)).then(function (result) {
      if (result) {
        this.performDelete();
      }
    }.bind(this), function (dismiss) {
    });
  }

  //delete model
  performDelete() {
    this.appService.showLoading(true);
    this.subscription = this.service.delete(this.model[this.uniqueKey]).subscribe(response => {
      try {
        this.appService.handleApiResponse(response, this.logType, LogAction.Delete, this.pageTitleKey, this.model, null, true);
        if (response != null && response.IsSuccess) {
          this.refresh();
        }
        else {
          this.appService.showLoading(false);
        }
      } catch (e) {
        this.appService.handleExceptions(e);
      }
    }, error => { this.appService.handleApiError(error); });
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
