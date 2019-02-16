// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { RolesComponent } from './roles.component';
import { RolesRoutingModule } from './roles-routing.module';
import { RolesService } from './roles.service';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RolesRoutingModule,
    TranslateModule
  ],
  declarations: [
    RolesComponent,
  ],
  providers: [
    RolesService
  ]
})
export class RolesModule { }
