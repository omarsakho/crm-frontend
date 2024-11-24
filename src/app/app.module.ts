import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component'; 
import { UserFormComponent } from './users/user-form/user-form.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { ProfilComponent } from './profil/profil.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Assure-toi que le composant est bien importé
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ListeTicketsComponent } from './components/liste-tickets/liste-tickets.component';
import { SoumettreDemandeComponent } from './components/soumettre-demande/soumettre-demande.component';
import { FormsModule } from '@angular/forms'; // <- Ajoute cette ligne
import { AssignAgentDialogComponent } from './components/assign-agent-dialog/assign-agent-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RendezvousComponent } from './components/rendezvous/rendezvous.component';
import { RendezvousListComponent } from './components/rendezvous-list/rendezvous-list.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // le module de FullCalendar
import { FactureListComponent } from './components/facture-list/facture-list.component';
import { CreateFactureComponent } from './components/create-facture/create-facture.component';
import { MatCardModule } from '@angular/material/card';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { CurrencyPipe } from '@angular/common';  




@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    HeaderComponent,
    FooterComponent,
    ForgotPasswordComponent,
    UserFormComponent,
    UserListComponent,
    ProfilComponent,
    SoumettreDemandeComponent,
    ListeTicketsComponent,
    AssignAgentDialogComponent,
    RendezvousComponent,
    RendezvousListComponent,
    FactureListComponent,
    CreateFactureComponent,
    DashboardComponent, 


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxDatatableModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    FormsModule, 
    MatFormFieldModule,
    MatSelectModule,
    FullCalendarModule,
    MatCardModule, 


  ],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync(),
    CurrencyPipe
  ],

})
export class AppModule {}
