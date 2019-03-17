import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyMasterComponent } from './companymaster.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Company Master'
    },
    children: [
      {
        path: 'companymaster',
        component: CompanyMasterComponent,
        data: {
          title: 'Company Master'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyMasterRoutingModule { }
