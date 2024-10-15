import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'], // N'oubliez pas d'ajouter ce fichier de style
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  faHome = faHome;
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;

  constructor(private router: Router) {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('token'); // Vérifie si l'utilisateur est connecté
  }

  logout() {
    localStorage.removeItem('token'); // Supprime le token
    this.isLoggedIn = false; // Met à jour l'état de connexion
    this.router.navigate(['/login']); // Redirige vers la page de connexion
  }
}
