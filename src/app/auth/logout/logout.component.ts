import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent {
  constructor(private authService: AuthService, private router: Router) {
    this.authService.logout().subscribe(
      () => {
        localStorage.removeItem('token'); // Retire le token
        this.router.navigate(['/login']); // Redirige vers la page de connexion
      },
      error => {
        console.error('Erreur de déconnexion', error);
      }
    );
  }
}
