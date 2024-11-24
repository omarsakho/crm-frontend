import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  userId: number | undefined;
  editMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      motDePasse: ['', [Validators.required, Validators.minLength(8)]], // Ajout du mot de passe lors de l'ajout
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id'];
      if (this.userId) {
        this.editMode = true;
        this.loadUser();
      }
    });

    // Si nous sommes en mode édition, désactiver le champ de mot de passe
    if (this.editMode) {
      this.userForm.get('motDePasse')?.disable();
    }
  }

  loadUser(): void {
    this.userService.getUser(this.userId!).subscribe(
      (user: any) => {
        this.userForm.patchValue({
          nom: user.nom,
          email: user.email,
          role: user.role,
        });
      },
      error => {
        console.error('Erreur lors du chargement de l\'utilisateur', error);
      }
    );
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userData = { ...this.userForm.value };

      if (this.editMode) {
        this.userService.updateUser(this.userId!, userData).subscribe(
          () => {
            console.log('Utilisateur mis à jour avec succès !');
            this.router.navigate(['/users']);
          },
          error => {
            console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
          }
        );
      } else {
        this.userService.createUser(userData).subscribe(
          () => {
            console.log('Utilisateur créé avec succès !');
            this.router.navigate(['/users']);
          },
          error => {
            console.error('Erreur lors de la création de l\'utilisateur', error);
          }
        );
      }
    }
  }
}
