import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignationTypeComponent } from './designationtype.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Designation Type'
    },
    children: [
      {
        path: 'designationtype',
        component: DesignationTypeComponent,
        data: {
          title: 'Designation Type'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationTypeRoutingModule { }
