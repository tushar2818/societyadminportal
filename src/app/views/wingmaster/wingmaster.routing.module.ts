import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WingMasterComponent } from './wingmaster.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Wing Master'
    },
    children: [
      {
        path: 'wingmaster',
        component: WingMasterComponent,
        data: {
          title: 'Wing Master'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WingMasterRoutingModule { }
