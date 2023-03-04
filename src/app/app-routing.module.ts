import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/main/login/login.component';
import { MainComponent } from './components/main/main.component';
import { SignUpComponent } from './components/main/sign-up/sign-up.component';

const routes: Routes = [
  { path:'', redirectTo:'homepage', pathMatch:'full' },
  { path:'homepage', component: MainComponent,
    loadChildren: () => import('./components/main/main.module').then((mod) => mod.MainModule)
  },
  { path:'login', component: LoginComponent },
  { path:'signup', component: SignUpComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
