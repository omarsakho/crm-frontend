// src/app/components/paiement/paiement.component.ts
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { FactureService } from '../../services/facture.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {
  stripe: any;
  elements: any;
  clientSecret!: string;
  factureId!: number;

  constructor(
    private factureService: FactureService, 
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    // Récupération de l'ID de la facture à partir de l'URL
    const factureIdParam = this.route.snapshot.paramMap.get('id');
    
    if (factureIdParam) {
      this.factureId = +factureIdParam;
    } else {
      console.error('ID de facture manquant');
      return;
    }

    // Charger Stripe.js avec votre clé publique
    this.stripe = await loadStripe('pk_test_51QKT6fCSLNvVkJf5YJUldiQsruOOic2SEY2PPtpREPCBoS50GIQoOxq3z9SQ2seDK02xmxuSe9bSjQ071A6PYlpn0037DXtcIL');

    // Créer un élément de carte bancaire
    this.elements = this.stripe.elements();
    const card = this.elements.create('card');
    card.mount('#card-element');

    // Récupérer le clientSecret depuis l'API Laravel pour cette facture
    this.factureService.creerPaymentIntent(this.factureId).subscribe((response) => {
      this.clientSecret = response.clientSecret;
    });
  }

  async payer() {
    const cardElement = this.elements.getElement('card');
    const paymentMessageElement = document.getElementById('payment-message');
    
    if (cardElement) {
      const { paymentIntent, error } = await this.stripe.confirmCardPayment(this.clientSecret, {
        payment_method: {
          card: cardElement,
        }
      });

      if (error) {
        console.error('Erreur lors du paiement', error);
        
        // Afficher un message d'erreur
        paymentMessageElement!.innerHTML = `<div class="alert alert-danger">Erreur lors du paiement : ${error.message}</div>`;
      } else if (paymentIntent?.status === 'succeeded') {
        console.log('Paiement réussi', paymentIntent);
        
        // Afficher un message de succès
        paymentMessageElement!.innerHTML = '<div class="alert alert-success">Paiement effectué avec succès !</div>';

        // Marquer la facture comme payée
        this.factureService.marquerFactureCommePayee(this.factureId).subscribe(
          () => {
            console.log('Facture marquée comme payée');
            
            // Rediriger vers la liste des factures
            this.router.navigate(['/factures']);  // Redirection vers la liste des factures
          },
          (error) => {
            console.error('Erreur lors de la mise à jour de la facture', error);
            paymentMessageElement!.innerHTML = `<div class="alert alert-danger">Erreur lors de la mise à jour de la facture.</div>`;
          }
        );
      }
    } else {
      console.error('Élément de carte non trouvé');
      paymentMessageElement!.innerHTML = '<div class="alert alert-danger">Erreur : Élément de carte non trouvé.</div>';
    }
  }  
}
