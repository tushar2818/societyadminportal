import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectMasterComponent } from './projectmaster.component';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Project Master'
    },
    children: [
      {
        path: 'projectmaster',
        component: ProjectMasterComponent,
        data: {
          title: 'Project Master'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectMasterRoutingModule { }
