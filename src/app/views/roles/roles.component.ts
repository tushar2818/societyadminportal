import { Component, TemplateRef } from '@angular/core';
import { AppConstants, AlertType, CommonMethods, ApiType, LogAction, LogType } from '../../shared/appconstants';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { RolesService } from './roles.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../../app.service';
import swal from 'sweetalert2';

@Component({
  templateUrl: 'roles.component.html'
})

export class RolesComponent {
  modalRef: BsModalRef;
  modelHeaders: any = [];
  model: any;
  modellist: any = [];
  modelOld: any;
  isModelEditable: boolean;

  constructor(
    private _service: RolesService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private appService: AppService,
  ) {
  }

  ngOnInit() {
    try {
      this.modelHeaders = ["Role", "Normalized Role", "Concurrency Stamp"];
      this.refresh();
    } catch (e) {
      CommonMethods.writeLogs(AlertType.Error, e);
      this.spinner.hide();
    }
  }

  refresh() {
    this.spinner.show();
    this.modellist = [];
    this.onCancel(true);
    this.isModelEditable = true;
    this._service.getall().subscribe(response => {
      try {
        CommonMethods.handleApiResponse(ApiType.GetAll, response);
        if (response.IsSuccess) {
          this.modellist = response.Result;
          CommonMethods.applyDataTableStyles();
          this.keepAuditLogs(LogAction.GetAll);
        }
        this.spinner.hide();
      } catch (e) {
        CommonMethods.writeLogs(AlertType.Error, e);
        this.spinner.hide();
      }
    },
      error => {
        CommonMethods.showMessage(AppConstants.TEXT_ERROR_API, AlertType.Error);
        this.spinner.hide();
      });
  }

  onOpenPopup(template: TemplateRef<any>, model: any = null) {
    this.modelOld = {};
    this.model = {};
    if (model == null) {
      this.modalRef = this.modalService.show(template, AppConstants.defaultModalconfig);
      CommonMethods.addDefaultModalSettings();
    }
    else {
      this.spinner.show();
      this._service.getById(model.Id).subscribe(response => {
        try {
          CommonMethods.handleApiResponse(ApiType.GetById, response);
          if (response.IsSuccess) {
            this.isModelEditable = false;
            this.model = response.Result;
            this.modelOld = CommonMethods.getDeepCopy(this.model);
            this.modalRef = this.modalService.show(template, AppConstants.defaultModalconfig);
            CommonMethods.addDefaultModalSettings();
            this.keepAuditLogs(LogAction.GetById, this.model);
          }
          this.spinner.hide();
        } catch (e) {
          CommonMethods.writeLogs(AlertType.Error, e);
          this.spinner.hide();
        }
      },
        error => {
          CommonMethods.showMessage(AppConstants.TEXT_ERROR_API, AlertType.Error);
          this.spinner.hide();
        });
    }
  }

  onSave(model: any, IsVallid: boolean) {
    if (IsVallid) {
      this.spinner.show();
      this._service.post(this.model).subscribe(response => {
        try {
          CommonMethods.handleApiResponse(ApiType.Post, response);
          if (response.IsSuccess) {
            this.refresh();
            this.keepAuditLogs((this.model.Id == null || this.model.Id == "" || this.model.Id == "0") ? LogAction.Add :
              LogAction.Update, this.model, this.modelOld);
          }
          this.spinner.hide();
        } catch (e) {
          CommonMethods.writeLogs(AlertType.Error, e);
          this.spinner.hide();
        }
      },
        error => {
          CommonMethods.showMessage(AppConstants.TEXT_ERROR_API, AlertType.Error);
          this.spinner.hide();
        });
    }
  }

  onDelete() {
    swal.fire({
      title: AppConstants.TEXT_CONFIRM_TITLE,
      text: AppConstants.TEXT_CONFIRM_MESSAGE,
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: AppConstants.TEXT_CONFIRM_DELETE
    }).then((result) => {
      if (result.value) {
        this.perFormDelete();
      }
    }, function (dismiss) { });
  }

  perFormDelete() {
    this.spinner.show();
    this._service.delete(this.model.Id).subscribe(response => {
      try {
        CommonMethods.handleApiResponse(ApiType.Delete, response);
        if (response.IsSuccess) {
          this.refresh();
          this.keepAuditLogs(LogAction.Delete, this.model);
        }
      } catch (e) {
        CommonMethods.writeLogs(AlertType.Error, e);
        this.spinner.hide();
      }
    },
      error => {
        CommonMethods.showMessage(AppConstants.TEXT_ERROR_API, AlertType.Error);
        this.spinner.hide();
      });
  }

  keepAuditLogs(logAction: LogAction, data: any = "", oldData: any = "") {
    this.appService.keepAuditLog(LogType.Role, logAction, data, oldData);
  }

  onEdit() {
    this.isModelEditable = true;
  }

  onCancel(forceExecute: boolean) {
    try {
      if (this.modalRef != null)
      this.modalRef.hide();
    } catch (e) {
      CommonMethods.writeLogs(AlertType.Error, e);
    }
  }
}
