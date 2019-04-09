import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ClientMasterComponent } from './clientmaster.component';
import { ClientMasterRoutingModule } from './clientmaster.routing.module';
import { ClientMasterService } from './clientmaster.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ClientMasterRoutingModule,
    TranslateModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    ClientMasterComponent,
  ],
  providers: [
    ClientMasterService
  ]
})
export class ClientMasterModule { }
