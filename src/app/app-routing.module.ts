import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './components/shared/auth-guard/auth.guard';

const routes: Routes = [
  { path:'', redirectTo:'homepage', pathMatch:'full' },
  { path:'homepage', component: MainComponent,
    loadChildren: () => import('./components/main/main.module').then((mod) => mod.MainModule)
  },
  { path:'admin', component: AdminComponent, canActivate: [AuthGuard],
    loadChildren: () => import('./components/admin/admin.module').then((mod) => mod.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
