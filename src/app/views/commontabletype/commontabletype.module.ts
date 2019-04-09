import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonTableTypeComponent } from './commontabletype.component';
import { CommonTableTypeRoutingModule } from './commontabletype.routing.module';
import { CommonTableTypeService } from './commontabletype.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    CommonTableTypeRoutingModule
  ],
  declarations: [
    CommonTableTypeComponent,
  ],
  providers: [
    CommonTableTypeService
  ]
})
export class CommonTableTypeModule { }
