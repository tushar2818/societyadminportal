import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CompanyComponent } from './company.component';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyService } from './company.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CompanyRoutingModule,
    TranslateModule
  ],
  declarations: [
    CompanyComponent,
  ],
  providers: [
    CompanyService
  ]
})
export class CompanyModule { }
