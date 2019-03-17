import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlatTypeMasterComponent } from './flattypemaster.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Flat Type Master'
    },
    children: [
      {
        path: 'flattypemaster',
        component: FlatTypeMasterComponent,
        data: {
          title: 'Flat Type Master'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlatTypeMasterRoutingModule { }
