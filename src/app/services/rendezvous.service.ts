import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {
  private apiUrl = 'http://localhost:8000/api'; // URL de votre API Laravel

  constructor(private http: HttpClient) {}

  planifierRendezVous(ticketId: number, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/tickets/${ticketId}/rendezvous`, data, { headers });
  }

  // Ajoutez la méthode pour modifier le rendez-vous
  modifierRendezVous(rendezvousId: number, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put(`${this.apiUrl}/rendezvous/${rendezvousId}`, data, { headers });
  }

  // Ajoutez la méthode pour annuler le rendez-vous
  annulerRendezVous(rendezvousId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.apiUrl}/rendezvous/${rendezvousId}`, { headers });
  }

  getRendezVousList(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/rendezvous`, { headers });
  } 
  
  // Ajouter cette méthode dans rendezvous.service.ts
  obtenirRendezVous(rendezvousId: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.apiUrl}/rendezvous/${rendezvousId}`, { headers });
  }

}
