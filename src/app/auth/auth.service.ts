import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // Importer l'opérateur tap

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // URL de votre API Laravel

  constructor(private http: HttpClient) {}

  // Méthode pour s'inscrire
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/inscription`, user);
  }

  // Méthode pour se connecter
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/connexion`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.utilisateur.role); // Stocker le rôle
      })
    );
  }

  // Méthode pour se déconnecter
  logout(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Aucun token trouvé. Veuillez vous reconnecter.'); // Gérer l'absence de token
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this.apiUrl}/deconnexion`, {}, { headers }).pipe(
      tap(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('role'); // Supprimer également le rôle lors de la déconnexion
      })
    );
  }

  // Méthode pour vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token'); // Retourne true si un token existe
  }

  // Getter pour vérifier si l'utilisateur est connecté
  get isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  // Méthode pour envoyer le lien de réinitialisation du mot de passe
  sendPasswordResetLink(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/mot-de-passe-oublie`, data);
  }
}
