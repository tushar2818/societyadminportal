import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectMasterComponent } from './projectmaster.component';
import { ProjectMasterRoutingModule } from './projectmaster.routing.module';
import { ProjectMasterService } from './projectmaster.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProjectMasterRoutingModule,
    TranslateModule
  ],
  declarations: [
    ProjectMasterComponent,
  ],
  providers: [
    ProjectMasterService
  ]
})
export class ProjectMasterModule { }
