import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RendezvousService } from 'src/app/services/rendezvous.service';

@Component({
  selector: 'app-rendezvous',
  templateUrl: './rendezvous.component.html',
  styleUrls: ['./rendezvous.component.css']
})
export class RendezvousComponent implements OnInit {
  rendezvousForm: FormGroup;
  ticketId!: number;  
  isEditing: boolean = false;
  rendezvousId?: number;
  minDate: string;
  errorMessage: string = '';  // Variable pour stocker le message d'erreur

  constructor(
    private fb: FormBuilder,
    private rendezvousService: RendezvousService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.rendezvousForm = this.fb.group({
      date_rendezvous: ['', Validators.required],
      lieu: ['', Validators.required],
    });

    const currentDate = new Date();
    this.minDate = currentDate.toISOString().slice(0, 16);  
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ticketId = +params['ticketId'];

      if (params['rendezvousId']) {
        this.isEditing = true;
        this.rendezvousId = +params['rendezvousId'];
        this.loadRendezvous(this.rendezvousId);
      }
    });
  }

  loadRendezvous(rendezvousId: number): void {
    this.rendezvousService.obtenirRendezVous(rendezvousId).subscribe(response => {
      this.rendezvousForm.patchValue({
        date_rendezvous: response.date_rendezvous,
        lieu: response.lieu
      });
    });
  }

  onSubmit(): void {
    if (this.rendezvousForm.invalid) return;

    const formData = this.rendezvousForm.value;

    if (this.isEditing && this.rendezvousId) {
      this.rendezvousService.modifierRendezVous(this.rendezvousId, formData).subscribe(
        response => {
          alert('Rendez-vous modifié avec succès');
          this.router.navigate(['/tickets', this.ticketId]);
        },
        error => {
          this.handleError(error);
        }
      );
    } else {
      this.rendezvousService.planifierRendezVous(this.ticketId, formData).subscribe(
        response => {
          alert('Rendez-vous planifié avec succès');
          this.router.navigate(['/tickets', this.ticketId]);
        },
        error => {
          this.handleError(error);
        }
      );
    }
  }

  annulerRendezvous(): void {
    if (this.rendezvousId) {
      this.rendezvousService.annulerRendezVous(this.rendezvousId).subscribe(() => {
        alert('Rendez-vous annulé avec succès');
        this.router.navigate(['/tickets', this.ticketId]);
      });
    }
  }

  // Méthode pour gérer les erreurs et afficher un message explicite en cas de conflit
  handleError(error: any): void {
    if (error.status === 409) {
      this.errorMessage = 'Conflit de rendez-vous : Un autre rendez-vous est déjà planifié à cette date et heure. Veuillez choisir une autre date ou heure.';
    } else {
      this.errorMessage = 'Une erreur s\'est produite lors de la planification du rendez-vous. Veuillez réessayer.';
    }
  }
}
