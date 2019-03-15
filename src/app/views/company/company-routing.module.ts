import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyComponent } from './company.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Company'
    },
    children: [
      {
        path: 'company',
        component: CompanyComponent,
        data: {
          title: 'Company'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
