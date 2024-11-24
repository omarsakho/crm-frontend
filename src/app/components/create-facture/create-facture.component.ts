// src/app/components/create-facture/create-facture.component.ts
import { Component, OnInit } from '@angular/core';
import { FactureService } from '../../services/facture.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-facture',
  templateUrl: './create-facture.component.html',
  styleUrls: ['./create-facture.component.css']
})
export class CreateFactureComponent implements OnInit {
  ticketId!: number;  // Utilisation de '!' pour garantir l'initialisation
  montant!: number;   // Utilisation de '!' pour garantir l'initialisation
  message: { type: string, text: string } | null = null;  // Pour les messages de succès/erreur

  constructor(
    private factureService: FactureService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du ticket depuis l'URL
    this.ticketId = this.route.snapshot.params['ticketId'];
  }

  // Créer une nouvelle facture
  submitFacture(): void {
    this.factureService.createFacture(this.ticketId, this.montant).subscribe(
      (response) => {
        console.log('Facture créée', response);

        // Message de succès
        this.message = { type: 'success', text: 'La facture a été créée avec succès.' };

        // Optionnel : délai pour garantir que l'opération est complètement terminée
        setTimeout(() => {
          // Rediriger vers la liste des factures après la création
          this.router.navigate(['/factures']);  // Redirection vers la liste des factures
        }, 500); // Délai de 500ms
      },
      (error) => {
        console.error('Erreur lors de la création de la facture', error);

        // Message d'erreur
        this.message = { type: 'error', text: 'Une erreur est survenue lors de la création de la facture.' };
      }
    );
  }
}
