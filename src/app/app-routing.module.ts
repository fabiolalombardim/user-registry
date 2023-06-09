import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConfigErrorComponent } from './components/config-error/config-error.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'error', component: ConfigErrorComponent },
  { path: '**', component: DashboardComponent } // FOR FUTURE NOT FOUND PAGE

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
