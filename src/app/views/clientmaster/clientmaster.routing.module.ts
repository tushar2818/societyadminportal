import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientMasterComponent } from './clientmaster.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Client Master'
    },
    children: [
      {
        path: 'clientmaster',
        component: ClientMasterComponent,
        data: {
          title: 'Client Master'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientMasterRoutingModule { }
