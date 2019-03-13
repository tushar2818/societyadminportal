import { Component, TemplateRef } from '@angular/core';
import { AppConstants, AlertType, CommonMethods, CityType, LogAction, LogType, ActionMode } from '../../shared/appconstants';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AppService } from '../../app.service';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { CityService } from './city.service';

@Component({
  templateUrl: 'city.component.html'
})

export class CityComponent {
  subscription: Subscription;
  modalRef: BsModalRef;
  modelHeaders: any = [];
  model: any;
  modellist: any = [];
  modelOld: any;
  isModelEditable: boolean;
  mode: ActionMode = ActionMode.add;
  logType: LogType = LogType.City;
  uniqueKey: any = "Id";
  pageTitleKey: any = "PageTitles.City";

  cityTypes: any = [];
  states: any = [];
  districts: any = [];
  talukas: any = [];

  constructor(
    private service: CityService,
    private modalService: BsModalService,
    private appService: AppService) {
  }

  //initilization
  ngOnInit() {
    try {
      this.modelHeaders = ["City", "City Type", "State", "Distinct", "Taluka", "Active"];
      this.cityTypes = AppConstants.cityTypes;
      this.refresh();
    } catch (e) {
      this.appService.handleExceptions(e);
    }
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

  //refresh data
  refresh() {
    this.appService.showLoading(true);
    this.modellist = [];
    this.onCancelPopup();
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
    this.isModelEditable = true;
    if (model == null) {
      this.mode = ActionMode.add;
      this.modalRef = this.modalService.show(template, AppConstants.defaultModalconfig);
      CommonMethods.addDefaultModalSettings();
    }
    else {
      this.mode = ActionMode.edit;
      this.isModelEditable = false;
      this.appService.showLoading(true);
      this.subscription = this.service.getById(model[this.uniqueKey], false).subscribe(response => {
        try {
          if (response != null && response.IsSuccess) {
            this.model = response.Result;
            this.modelOld = CommonMethods.getDeepCopy(this.model);
            this.refreshSource("CityType", false);
            this.refreshSource("State", false);
            this.refreshSource("District", false);
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

  refreshSource(sourceType: string, clearModel: boolean = true) {
    let stateId = -1;
    let cityTypeId = -1;
    switch (sourceType) {
      case CityType.CityType:
        this.states = [];
        this.districts = [];
        this.talukas = [];
        if (clearModel) {
          this.model.StateId = null;
          this.model.DistrictId = null;
          this.model.TalukaId = null;
        }
        cityTypeId = AppConstants.GetCityTypeIdFromUniqueKey(CityType.State);
        this.states = this.modellist.filter(function (o) { return o.CityType == cityTypeId; });
        break;
      case CityType.State:
        this.districts = [];
        this.talukas = [];
        if (clearModel) {
          this.model.DistrictId = null;
          this.model.TalukaId = null;
        }
        stateId = this.model.StateId;
        cityTypeId = AppConstants.GetCityTypeIdFromUniqueKey(CityType.District);
        this.districts = this.modellist.filter(function (o) {
          return o.CityType == cityTypeId &&
            o.StateId == stateId;
        });
        break;
      case CityType.District:
        this.talukas = [];
        if (clearModel) {
          this.model.TalukaId = null;
        }
        stateId = this.model.StateId;
        let districtId = this.model.DistrictId;
        cityTypeId = AppConstants.GetCityTypeIdFromUniqueKey(CityType.Taluka);
        this.talukas = this.modellist.filter(function (o) { return o.CityType == cityTypeId && o.StateId == stateId && o.DistrictId == districtId; });
        break;
      default:
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

  generateArray(obj) {
    return Object.keys(obj).map((key) => { return { 'Key': key, 'Value': obj[key] } });
  }

}
