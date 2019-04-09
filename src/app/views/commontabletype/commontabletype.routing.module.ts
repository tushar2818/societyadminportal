import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonTableTypeComponent } from './commontabletype.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Common Table Type'
    },
    children: [
      {
        path: 'commontabletype',
        component: CommonTableTypeComponent,
        data: {
          title: 'Common Table Type'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonTableTypeRoutingModule { }
