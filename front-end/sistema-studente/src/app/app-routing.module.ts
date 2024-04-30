import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { LoginComponent } from './components/pages/login/login.component';
import { DashboardComponent } from './components/pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './components/pages/user/user-dashboard/user-dashboard.component';
import { UserGuard } from './Services/user.guard';
import { AdminGuard } from './Services/admin.guard';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { WelcomeComponent } from './components/pages/admin/welcome/welcome.component';
import { ViewCategorieComponent } from './components/pages/admin/view-categorie/view-categorie.component';
import { AddCategoriaComponent } from './components/pages/admin/add-categoria/add-categoria.component';
import { ViewEsamiComponent } from './components/pages/admin/view-esami/view-esami.component';
import { AddEsameComponent } from './components/pages/admin/add-esame/add-esame.component';
import { AggiornaEsameComponent } from './components/pages/admin/aggiorna-esame/aggiorna-esame.component';
import { ViewEsameDomandaComponent } from './components/pages/admin/view-esame-domanda/view-esame-domanda.component';
import { AddDomandaComponent } from './components/pages/admin/add-domanda/add-domanda.component';
import { AggiornaDomandaComponent } from './components/pages/admin/aggiorna-domanda/aggiorna-domanda.component';
import { LoaadEsameComponent } from './components/pages/user/loaad-esame/loaad-esame.component';
import { IstruzioniComponent } from './components/pages/user/istruzioni/istruzioni.component';
import { StartComponent } from './components/pages/user/start/start.component';
import { NormalGuard } from './Services/normal.guard';
import { ProfileUserComponent } from './components/pages/user/profile-user/profile-user.component';

const routes: Routes = [
  {
    path:'', component: HomeComponent, pathMatch: 'full'
  },
  {
    path:'signup', component : SignupComponent, pathMatch: 'full'
  },
  {
    path:'login', component : LoginComponent, pathMatch: 'full'
  },
  {
    path:'admin',
    component :DashboardComponent,
    canActivate: [AdminGuard],
    children:[
      {
        path: 'profile', component:ProfileComponent
      },
      {
        path: '', component:WelcomeComponent
      },
      {
        path: 'categorie', component:ViewCategorieComponent
      },
      {
        path: 'add-categoria', component:AddCategoriaComponent
      },
      {
        path: 'esami', component:ViewEsamiComponent
      },
      {
        path: 'add-esami', component:AddEsameComponent
      },
      {
        path: 'esame/:esameId', component:AggiornaEsameComponent
      },
      {
        path: 'vedere-domande/:esameId/:titolo', component:ViewEsameDomandaComponent
      },
      {
        path: 'add-domanda/:esameId/:titolo', component:AddDomandaComponent
      },
      {
        path: 'domanda/:domandaId', component:AggiornaDomandaComponent
      }
    ]
  },
  {
    path:'user', component : UserDashboardComponent,
      canActivate: [UserGuard],
      children : [
        {
          path: 'profilo', component: ProfileUserComponent
        },
        {
          path: ':catId', component : LoaadEsameComponent
        },
        {
          path: 'istruzioni/:esameId', component : IstruzioniComponent
        }

      ]
  },
  {
    path: 'start/:esameId', component:StartComponent,
    canActivate:[NormalGuard]
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
