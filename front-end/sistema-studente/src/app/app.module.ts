import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { LoginComponent } from './components/pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/pages/home/home.component';
import { DashboardComponent } from './components/pages/admin/dashboard/dashboard.component';
import { UserDashboardComponent } from './components/pages/user/user-dashboard/user-dashboard.component';
import { authIncerceptorProviders } from './Services/auth.interceptor';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { SidebarComponent } from './components/pages/admin/sidebar/sidebar.component';
import { WelcomeComponent } from './components/pages/admin/welcome/welcome.component';
import { ViewCategorieComponent } from './components/pages/admin/view-categorie/view-categorie.component';
import { AddCategoriaComponent } from './components/pages/admin/add-categoria/add-categoria.component';
import { ViewEsamiComponent } from './components/pages/admin/view-esami/view-esami.component';
import { AddEsameComponent } from './components/pages/admin/add-esame/add-esame.component';
import { AddDomandaComponent } from './components/pages/admin/add-domanda/add-domanda.component';
import { ViewEsameDomandaComponent } from './components/pages/admin/view-esame-domanda/view-esame-domanda.component';
import { AggiornaEsameComponent } from './components/pages/admin/aggiorna-esame/aggiorna-esame.component';
import { AggiornaDomandaComponent } from './components/pages/admin/aggiorna-domanda/aggiorna-domanda.component';
import { SidebarUserComponent } from './components/pages/user/sidebar-user/sidebar-user.component';
import { LoaadEsameComponent } from './components/pages/user/loaad-esame/loaad-esame.component';
import { IstruzioniComponent } from './components/pages/user/istruzioni/istruzioni.component';
import { StartComponent } from './components/pages/user/start/start.component';
import { ProfileUserComponent } from './components/pages/user/profile-user/profile-user.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    UserDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    WelcomeComponent,
    ViewCategorieComponent,
    AddCategoriaComponent,
    ViewEsamiComponent,
    AddEsameComponent,
    AddDomandaComponent,
    ViewEsameDomandaComponent,
    AggiornaEsameComponent,
    AggiornaDomandaComponent,
    SidebarUserComponent,
    LoaadEsameComponent,
    IstruzioniComponent,
    StartComponent,
    ProfileUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule




  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimationsAsync(),
    authIncerceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
