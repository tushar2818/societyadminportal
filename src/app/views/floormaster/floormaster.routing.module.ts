import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FloorMasterComponent } from './floormaster.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Floor Master'
    },
    children: [
      {
        path: 'floormaster',
        component: FloorMasterComponent,
        data: {
          title: 'Floor Master'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FloorMasterRoutingModule { }
