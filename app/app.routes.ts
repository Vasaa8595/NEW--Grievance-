import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { Component1Component } from './component1/component1.component';
import { ComponentComponent } from './component/component.component';
import { FacultyDashboardComponent } from './faculty-dashboard/faculty-dashboard.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [

      { path: 'component1', component: Component1Component },
      { path: 'component', component: ComponentComponent },
      {path: 'student-profile', component: StudentProfileComponent}
      
    ]
  },
  { path: 'faculty-dashboard', component: FacultyDashboardComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Wildcard route for unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
