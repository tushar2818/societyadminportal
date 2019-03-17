import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FlatTypeMasterComponent } from './flattypemaster.component';
import { FlatTypeMasterRoutingModule } from './flattypemaster.routing.module';
import { FlatTypeMasterService } from './flattypemaster.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    FlatTypeMasterRoutingModule
  ],
  declarations: [
    FlatTypeMasterComponent,
  ],
  providers: [
    FlatTypeMasterService
  ]
})
export class FlatTypeMasterModule { }
