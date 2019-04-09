import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DesignationTypeComponent } from './designationtype.component';
import { DesignationTypeRoutingModule } from './designationtype.routing.module';
import { DesignationTypeService } from './designationtype.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    DesignationTypeRoutingModule
  ],
  declarations: [
    DesignationTypeComponent,
  ],
  providers: [
    DesignationTypeService
  ]
})
export class DesignationTypeModule { }
