import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RolesComponent } from './roles.component';
import { RolesRoutingModule } from './roles-routing.module';
import { RolesService } from './roles.service';

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
