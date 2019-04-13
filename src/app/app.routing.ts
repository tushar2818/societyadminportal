import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { LoginPageComponent } from './views/loginpage/loginpage.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'loginpage',
    component: LoginPageComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
  canActivate: [AuthGuard],
    children: [
      {
        path: 'usermanagements',
        loadChildren: './views/roles/roles.module#RolesModule'
      },
      {
        path: 'usermanagements',
        loadChildren: './views/clientmaster/clientmaster.module#ClientMasterModule'
      },
      {
        path: 'master',
        loadChildren: './views/commontabletype/commontabletype.module#CommonTableTypeModule'
      },
      {
        path: 'master',
        loadChildren: './views/designationtype/designationtype.module#DesignationTypeModule'
      },
      {
        path: 'master',
        loadChildren: './views/designationmaster/designationmaster.module#DesignationMasterModule'
      },
      {
        path: 'master',
        loadChildren: './views/designationtypemapping/designationtypemapping.module#DesignationTypeMappingModule'
      },
      {
        path: 'master',
        loadChildren: './views/companymaster/companymaster.module#CompanyMasterModule'
      }, 
      {
        path: 'master',
        loadChildren: './views/projectmaster/projectmaster.module#ProjectMasterModule'
      },
      {
        path: 'master',
        loadChildren: './views/buildingmaster/buildingmaster.module#BuildingMasterModule'
      },
      {
        path: 'master',
        loadChildren: './views/wingmaster/wingmaster.module#WingMasterModule'
      },
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule'
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
