import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FloorMasterComponent } from './floormaster.component';
import { FloorMasterRoutingModule } from './floormaster.routing.module';
import { FloorMasterService } from './floormaster.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FloorMasterRoutingModule,
    TranslateModule
  ],
  declarations: [
    FloorMasterComponent,
  ],
  providers: [
    FloorMasterService
  ]
})
export class FloorMasterModule { }
