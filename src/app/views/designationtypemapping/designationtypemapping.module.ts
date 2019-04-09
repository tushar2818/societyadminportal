import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DesignationTypeMappingComponent } from './designationtypemapping.component';
import { DesignationTypeMappingRoutingModule } from './designationtypemapping.routing.module';
import { DesignationTypeMappingService } from './designationtypemapping.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    DesignationTypeMappingRoutingModule
  ],
  declarations: [
    DesignationTypeMappingComponent,
  ],
  providers: [
    DesignationTypeMappingService
  ]
})
export class DesignationTypeMappingModule { }
