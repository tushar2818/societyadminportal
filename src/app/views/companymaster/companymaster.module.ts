import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CompanyMasterComponent } from './companymaster.component';
import { CompanyMasterRoutingModule } from './companymaster.routing.module';
import { CompanyMasterService } from './companymaster.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CompanyMasterRoutingModule,
    TranslateModule
  ],
  declarations: [
    CompanyMasterComponent,
  ],
  providers: [
    CompanyMasterService
  ]
})
export class CompanyMasterModule { }
