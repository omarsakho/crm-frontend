import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { faHome, faUser, faSignOutAlt, faTachometerAlt, faUsers, faUserCircle } from '@fortawesome/free-solid-svg-icons'; // Importer les icônes


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = ''; // Propriété pour stocker les messages d'erreur
  faHome = faHome; // Initialiser les icônes
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;
  faTachometerAlt = faTachometerAlt; // Ajout pour Dashboard
  faUsers = faUsers; // Ajout pour Liste des Utilisateurs
  faUserCircle = faUserCircle; // Ajout pour Profil

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {
    // Initialisation du formulaire avec validation
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Validation pour l'email
      motDePasse: ['', [Validators.required]] // Validation pour le mot de passe
    });
  }

  ngOnInit(): void {}

  // Méthode appelée lors de la soumission du formulaire
  onSubmit() {
    if (this.loginForm.valid) {
      // Appel au service d'authentification
      this.authService.login(this.loginForm.value).subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token); // Stocker le token
          localStorage.setItem('role', response.utilisateur.role); // Stocker le rôle de l'utilisateur
  
          const userRole = response.utilisateur.role;
  
          // Redirige selon le rôle de l'utilisateur
          if (userRole === 'administrateur') {
            this.router.navigate(['/dashboard']).then(() => {
              window.location.reload();  // Recharge la page après redirection
            });
          } else {
            this.router.navigate(['/tickets']).then(() => {
              window.location.reload();  // Recharge la page après redirection
            });
          }
        },
        error => {
          console.error('Erreur de connexion', error);
          // Affichage d'un message d'erreur si la connexion échoue
          this.errorMessage = 'Échec de la connexion. Veuillez vérifier vos identifiants.';
        }
      );
    }
  }
  
}
