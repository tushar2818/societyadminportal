import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DesignationMasterComponent } from './designationmaster.component';
import { DesignationMasterRoutingModule } from './designationmaster.routing.module';
import { DesignationMasterService } from './designationmaster.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    DesignationMasterRoutingModule
  ],
  declarations: [
    DesignationMasterComponent,
  ],
  providers: [
    DesignationMasterService
  ]
})
export class DesignationMasterModule { }
