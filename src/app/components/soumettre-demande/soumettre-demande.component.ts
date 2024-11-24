import { Component } from '@angular/core';
import { TicketService } from '..//../services/ticket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-soumettre-demande',
  templateUrl: './soumettre-demande.component.html',
})
export class SoumettreDemandeComponent {
  ticketData = {
    description: '',
    priorite: 'moyenne',
    type_demande: 'technique',
  };

  constructor(private ticketService: TicketService, private router: Router) {}

  soumettreDemande() {
    this.ticketService.soumettreDemande(this.ticketData).subscribe(
      (response) => {
        console.log('Demande soumise avec succès:', response);
        this.router.navigate(['/tickets']);
      },
      (error) => {
        console.error('Erreur lors de la soumission:', error);
      }
    );
  }
}
