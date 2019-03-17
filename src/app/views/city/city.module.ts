import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CityComponent } from './city.component';
import { CityRoutingModule } from './city.routing.module';
import { CityService } from './city.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CityRoutingModule,
    TranslateModule
  ],
  declarations: [
    CityComponent,
  ],
  providers: [
    CityService
  ]
})
export class CityModule { }
