import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkersPageComponent } from './workers/workers-page/workers-page.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path: 'login', component: AuthComponent},
  {path: 'workers', component: WorkersPageComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
