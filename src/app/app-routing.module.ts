import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/main/login/login.component';
import { MainComponent } from './components/main/main.component';
import { SignUpComponent } from './components/main/sign-up/sign-up.component';

const routes: Routes = [
  { path:'', redirectTo:'homepage', pathMatch:'full' },
  { path:'login', component: LoginComponent },
  { path:'signup', component: SignUpComponent },
  { path:'homepage', component: MainComponent,
    loadChildren: () => import('./components/main/main.module').then((mod) => mod.MainModule)
  },
  { path:'admin', component: AdminComponent,
    loadChildren: () => import('./components/admin/admin.module').then((mod) => mod.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
