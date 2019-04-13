import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildingMasterComponent } from './buildingmaster.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Building Master'
    },
    children: [
      {
        path: 'buildingmaster',
        component: BuildingMasterComponent,
        data: {
          title: 'Building Master'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildingMasterRoutingModule { }
