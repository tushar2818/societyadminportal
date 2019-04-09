import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignationTypeMappingComponent } from './designationtypemapping.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Designation Type Mapping'
    },
    children: [
      {
        path: 'designationtypemapping',
        component: DesignationTypeMappingComponent,
        data: {
          title: 'Designation Type Mapping'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationTypeMappingRoutingModule { }
