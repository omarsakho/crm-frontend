import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importer Router

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  profilForm!: FormGroup;
  utilisateur: any;
  messageSuccess = '';
  isLoggedIn: boolean = false; // Déclare la variable isLoggedIn

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router // Injecter Router
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
    this.initForm();
    this.isLoggedIn = !!localStorage.getItem('token'); // Vérifie si l'utilisateur est connecté
  }

  // Récupérer le profil de l'utilisateur
  getUserProfile(): void {
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.utilisateur = data;
        this.populateForm();
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du profil', error);
      }
    });
  }

  // Initialiser le formulaire avec des validators
  initForm(): void {
    this.profilForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: [''] // Optionnel
    });
  }

  // Remplir le formulaire avec les données du profil
  populateForm(): void {
    this.profilForm.patchValue({
      nom: this.utilisateur.nom,
      email: this.utilisateur.email
    });
  }

  // Soumettre le formulaire de mise à jour du profil
  onSubmit(): void {
    if (this.profilForm.invalid) {
      return;
    }

    this.userService.updateProfile(this.profilForm.value).subscribe({
      next: (response) => {
        this.messageSuccess = 'Profil mis à jour avec succès';
        this.getUserProfile(); // Récupérer les nouvelles données
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour du profil', error);
      }
    });
  }

  // Méthode pour déconnecter l'utilisateur
  logout() {
    // Supprime le token et met à jour l'état de connexion
    localStorage.removeItem('token');
    this.isLoggedIn = false; // Met à jour l'état de connexion
    this.router.navigate(['/login']).then(() => {
        // Utilise le .then pour attendre que la navigation soit terminée avant de rafraîchir la page
        window.location.reload(); // Rafraîchit la page
    });
  }

}
