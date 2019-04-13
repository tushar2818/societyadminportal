import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { WingMasterComponent } from './wingmaster.component';
import { WingMasterRoutingModule } from './wingmaster.routing.module';
import { WingMasterService } from './wingmaster.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    WingMasterRoutingModule,
    TranslateModule
  ],
  declarations: [
    WingMasterComponent,
  ],
  providers: [
    WingMasterService
  ]
})
export class WingMasterModule { }
