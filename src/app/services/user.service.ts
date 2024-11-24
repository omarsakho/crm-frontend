import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router'; // Ajoute cette ligne

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/utilisateurs'; // URL de l'API
  private profilUrl = 'http://localhost:8000/api/profil';    // URL pour la gestion du profil

  constructor(private http: HttpClient, private router: Router) {} // Ajoute le Router ici

  // Récupérer la liste des utilisateurs
  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  // Récupérer un utilisateur par son ID
  getUser(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  // Créer un nouvel utilisateur
  createUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  // Mettre à jour un utilisateur existant
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, user, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  // Supprimer un utilisateur
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  // *************** Gestion du profil ***************

  // Récupérer le profil de l'utilisateur authentifié
  getProfile(): Observable<any> {
    return this.http.get(this.profilUrl, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  // Mettre à jour le profil de l'utilisateur authentifié
  updateProfile(user: any): Observable<any> {
    return this.http.put(this.profilUrl, user, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  // *************** Méthodes d'aide ***************

  // Récupérer les en-têtes avec le token de connexion
  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }),
    };
  }

  // Gestion des erreurs
  private handleError(error: any): Observable<never> {
    console.error('Une erreur s\'est produite :', error);
    return throwError(() => new Error('Erreur lors de la communication avec le serveur'));
  }

  logout() {
    // Logic pour déconnecter l'utilisateur, comme supprimer le token ou les informations de session
    localStorage.removeItem('user'); // Exemple de suppression des informations d'utilisateur
    this.router.navigate(['/login']); // Redirige vers la page de connexion
  }

  // Bloquer un utilisateur
  blockUser(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/block`, {}, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

  // Débloquer un utilisateur
  unblockUser(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/unblock`, {}, this.getAuthHeaders()).pipe(
      catchError(this.handleError)
    );
  }

}
