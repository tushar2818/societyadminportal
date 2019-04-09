import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { GlobalService } from '../../shared/global.service';
import { AppConstants, AlertType, CommonMethods, ApiType, LogAction, LogType, ActionMode, LookupType } from '../../shared/appconstants';
import { DesignationTypeMappingService } from './designationtypemapping.service';

@Component({
  templateUrl: 'designationtypemapping.component.html'
})

export class DesignationTypeMappingComponent {

  subscription: Subscription;
  logType: LogType = LogType.DesignationTypeMapping; 
  pageTitleKey: any = "PageTitles.DesignationTypeMappings";
  allDesignationTypes: any = [];
  allDesignations: any = [];
  allDesignationsMaping: any = [];
  selectedDesignationType: number;
  nonSelectedDesignations: any[];
  selectedDesignations: any[];
  addButtonDisabled: boolean = true;
  removeButtonDisabled: boolean = true;

  //constructor 
  constructor(
    private service: DesignationTypeMappingService, 
    private globalService: GlobalService) {
    this.globalService.showLoading(true);
  }

  //initilization
  ngOnInit() {
    try {
      this.getAllLookups(); 
    } catch (e) {
      this.globalService.handleExceptions(e);
    }
  }

  //get all lookups
  getAllLookups() {
    try {
      this.addButtonDisabled = true;
      this.removeButtonDisabled = true;
      this.globalService.showLoading(true);
      let allLookupKeys = [LookupType.AllDesignationTypes, LookupType.AllDesignations, LookupType.AllDesignationTypesMappings];
      this.subscription = this.globalService.getallLookups(allLookupKeys).subscribe(response => {
        try {

          //handle api response
          this.globalService.handleApiResponse(response, this.logType, LogAction.GetAllLookups);
          if (response != null && response.IsSuccess) {
            let result = response.Result;
            this.allDesignationTypes = result.filter(s => s.LookupType == LookupType.AllDesignationTypes)[0].Data;
            this.allDesignations = result.filter(s => s.LookupType == LookupType.AllDesignations)[0].Data;
            this.allDesignationsMaping = result.filter(s => s.LookupType == LookupType.AllDesignationTypesMappings)[0].Data;

            //select first designation type by default
            this.selectedDesignationType = this.allDesignationTypes[0].DesignationTypeID;

            //refresh mapping
            this.refreshDesignationMapping();
          }
          this.globalService.showLoading(false);
        } catch (e) {
          this.globalService.handleExceptions(e);
        }
      }, error => { this.globalService.handleApiError(error); });
    } catch (e) {
      this.globalService.handleExceptions(e);
    }    
  }

  //refresh selected and non selected designation mapping
  refreshDesignationMapping() {
    try {
      this.nonSelectedDesignations = this.allDesignations;
      this.selectedDesignations = [];
      let selectedTypeDesignation = this.allDesignationsMaping.filter(s => s.ParentID == this.selectedDesignationType)[0];
      this.nonSelectedDesignations = this.allDesignations.filter(s => !selectedTypeDesignation.ChildID.includes(s.DesignationMasterID));
      this.selectedDesignations = this.allDesignations.filter(s => selectedTypeDesignation.ChildID.includes(s.DesignationMasterID));
    } catch (e) {
      this.globalService.handleExceptions(e);
    }    
  }

  //add or remove item
  addedOrRemoved() {
    try {
      let selectedTypeDesignation = this.allDesignationsMaping.filter(s => s.ParentID ==
        this.selectedDesignationType)[0];

      //if its added first time
      if (selectedTypeDesignation == null) {
        selectedTypeDesignation = { ParentID: this.selectedDesignationType, ChildID: [] };
        this.allDesignationsMaping.push(selectedTypeDesignation);
      }

      //select id according to crrent status
      let targetDropdownId = this.addButtonDisabled ? 'selectedDesignations' : 'nonSelectedDesignations';

      //get selected options and their values into changedIds
      let selectedOptions = $("[id*=" + targetDropdownId + "] option:selected");
      let changedIds = [];
      for (let option of selectedOptions) {
        changedIds.push(+option.value);
      }

      if (this.addButtonDisabled) {
        //user is going to remove records
        for (let id of changedIds) {
          selectedTypeDesignation.ChildID = selectedTypeDesignation.ChildID.filter(s => s != id);
        }
      }
      else {
        //user is going to add records
        for (let id of changedIds) {
          selectedTypeDesignation.ChildID.push(id);
        }
      }
      this.refreshDesignationMapping();
    } catch (e) {
      this.globalService.handleExceptions(e);
    }
  }

  //delete confirmation
  onSaveConfirmation() {
    swal.fire(this.globalService.getConfirmationSetting(this.pageTitleKey, LogAction.Save)).
      then(function (result) {
        if (result.value) {
          this.onSave();
        }
    }.bind(this), function (dismiss) {
    });
  }

  //save/update mapping
  onSave() {
    this.globalService.showLoading(true);
    this.subscription = this.service.savemapping(this.allDesignationsMaping).subscribe(response => {
      try {
        this.globalService.handleApiResponse(response, this.logType, LogAction.Update,
          this.pageTitleKey, this.allDesignationsMaping, null, true);
        if (response != null && response.IsSuccess) {
          //refresh lookups with mapping
          this.getAllLookups();
        }
        else {
          this.globalService.showLoading(false);
        }
      } catch (e) {
        this.globalService.handleExceptions(e);
      }
    }, error => { this.globalService.handleApiError(error); });
  }

}
