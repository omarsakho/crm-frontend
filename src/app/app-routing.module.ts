import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { DashboardComponent } from './dashboard/dashboard.component'; // Assurez-vous que le chemin est correct
import { AuthGuard } from './auth/auth.guard';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserFormComponent } from './users/user-form/user-form.component';
import { ProfilComponent } from './profil/profil.component'; // Importez votre composant Profil
import { SoumettreDemandeComponent } from './components/soumettre-demande/soumettre-demande.component';
import { ListeTicketsComponent } from './components/liste-tickets/liste-tickets.component';
import { RendezvousComponent } from './components/rendezvous/rendezvous.component';
import { RendezvousListComponent } from './components/rendezvous-list/rendezvous-list.component';
import { FactureListComponent } from './components/facture-list/facture-list.component';
import { CreateFactureComponent } from './components/create-facture/create-facture.component';
import { PaiementComponent } from './components/paiement/paiement.component';
import { ConfirmationComponent} from './components/confirmation/confirmation.component';
import { ConfidentialiteComponent } from './pages/confidentialite/confidentialite.component';
import { ConditionsUtilisationComponent } from './pages/conditions-utilisation/conditions-utilisation.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AProposComponent } from './pages/a-propos/a-propos.component'; 


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'inscription', component: RegisterComponent },
  { path: 'deconnexion', component: LogoutComponent },
  { path: 'mot-de-passe-oublie', component: ForgotPasswordComponent },
  
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Protégé par AuthGuard
  
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] }, // Protégé par AuthGuard
  { path: 'utilisateurs/ajouter', component: UserFormComponent, canActivate: [AuthGuard] }, // Ajout d'utilisateur protégé
  { path: 'users/edit/:id', component: UserFormComponent, canActivate: [AuthGuard] }, // Modification d'utilisateur
  
  { path: 'profil', component: ProfilComponent, canActivate: [AuthGuard] }, // Page profil protégée
  { path: 'soumettre-demande', component: SoumettreDemandeComponent, canActivate: [AuthGuard] }, // Soumettre une demande
  { path: 'tickets', component: ListeTicketsComponent, canActivate: [AuthGuard] }, // Liste des tickets
  
  { path: 'tickets/:ticketId/rendezvous', component: RendezvousComponent, canActivate: [AuthGuard] }, // Rendez-vous
  { path: 'tickets/:ticketId/rendezvous/:rendezvousId', component: RendezvousComponent, canActivate: [AuthGuard] }, // Rendez-vous avec ID
  { path: 'rendezvous/:ticketId', component: RendezvousComponent, canActivate: [AuthGuard] }, // Rendez-vous pour un ticket
  { path: 'rendezvous', component: RendezvousListComponent, canActivate: [AuthGuard] }, // Liste des rendez-vous
  { path: 'rendezvous/:rendezvousId/edit', component: RendezvousComponent, canActivate: [AuthGuard] }, // Modification de rendez-vous
  
  { path: 'factures', component: FactureListComponent, canActivate: [AuthGuard] }, // Liste des factures
  { path: 'tickets/:ticketId/factures/create', component: CreateFactureComponent, canActivate: [AuthGuard] }, // Création de facture
  { path: 'paiement/:id', component: PaiementComponent, canActivate: [AuthGuard] }, // Paiement
  { path: 'confirmation', component: ConfirmationComponent, canActivate: [AuthGuard] }, // Confirmation
  
  { path: 'politique-confidentialite', component: ConfidentialiteComponent },
  { path: 'conditions-utilisation', component: ConditionsUtilisationComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'a-propos', component: AProposComponent }, 

  // Redirections par défaut
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
