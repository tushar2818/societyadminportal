import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CityComponent } from './city.component'; 
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'city'
    },
    children: [
      {
        path: 'city',
        component: CityComponent,
        data: {
          title: 'city'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CityRoutingModule {}
