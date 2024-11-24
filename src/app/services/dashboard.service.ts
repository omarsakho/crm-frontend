import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:8000/api/statistiques'; // URL de l'API

  constructor(private http: HttpClient) { }

  // Récupérer les statistiques avec authentification
  getStatistics(): Observable<any> {
    const token = localStorage.getItem('token');  // Assurez-vous que le token est stocké dans le localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Si le token est valide, l'appel à l'API devrait fonctionner
    return this.http.get<any>(this.apiUrl, { headers });
  }
}
