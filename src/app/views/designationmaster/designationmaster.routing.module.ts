import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DesignationMasterComponent } from './designationmaster.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Designation Master'
    },
    children: [
      {
        path: 'designationmaster',
        component: DesignationMasterComponent,
        data: {
          title: 'Designation Master'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationMasterRoutingModule { }
