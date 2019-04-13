import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BuildingMasterComponent } from './buildingmaster.component';
import { BuildingMasterRoutingModule } from './buildingmaster.routing.module';
import { BuildingMasterService } from './buildingmaster.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BuildingMasterRoutingModule,
    TranslateModule
  ],
  declarations: [
    BuildingMasterComponent,
  ],
  providers: [
    BuildingMasterService
  ]
})
export class BuildingMasterModule { }
