import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  private apiUrl = 'http://localhost:8000/api';  // URL de base de l'API de votre application Laravel

  constructor(private http: HttpClient) {}

  // Récupérer toutes les factures
  getFactures(): Observable<any> {
    const token = localStorage.getItem('token'); // Assurez-vous que le token d'authentification est stocké dans localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/factures`, { headers });
  }

  // Récupérer les factures d'un ticket spécifique
  getFacturesByTicket(ticketId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(`${this.apiUrl}/factures`, { headers });
  }

  // Créer une facture pour un ticket
  createFacture(ticketId: number, montant: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.apiUrl}/tickets/${ticketId}/facture`, { montant }, { headers });
  }

  // Marquer une facture comme payée
  marquerFactureCommePayee(factureId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put(`${this.apiUrl}/factures/${factureId}/payer`, {}, { headers });
  }

  // Créer un PaymentIntent pour Stripe
  creerPaymentIntent(factureId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Appel à l'API Laravel pour créer un PaymentIntent
    return this.http.post(`${this.apiUrl}/paiement-intent`, { facture_id: factureId }, { headers });
  }

}
