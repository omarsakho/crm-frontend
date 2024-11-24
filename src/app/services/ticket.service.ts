import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = 'http://localhost:8000/api/tickets';

  constructor(private http: HttpClient) {}

  // Soumettre une nouvelle demande
  soumettreDemande(ticketData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(this.apiUrl, ticketData, { headers });
  }

  // Obtenir la liste des tickets (avec filtres)
  obtenirTickets(filtres?: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(this.apiUrl, { headers, params: filtres });
  }

  // Méthode pour affecter un ticket à un agent
  affecterTicket(ticketId: number, agentId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/${ticketId}/affecter`, { agent_id: agentId }, { headers });
  }

  // Mettre à jour le statut d'un ticket
  mettreAJourStatut(ticketId: number, statutData: { statut: string }): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/${ticketId}/statut`, statutData, { headers });
  }

  // Voir l'historique d'un ticket
  voirHistorique(ticketId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/${ticketId}`, { headers });
  }

  // Méthode pour archiver un ticket
  archiverTicket(ticketId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/${ticketId}/archiver`, {}, { headers });
  }


  // Obtenir la liste des agents
  obtenirAgents(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('http://localhost:8000/api/agents', { headers });
  }
}
