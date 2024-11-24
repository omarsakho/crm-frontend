import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCalendarAlt, faHome, faUser, faSignOutAlt, faTachometerAlt, faUsers, faUserCircle, faPlusCircle, faClipboardList, faFileAlt, faListAlt, faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  showProfileForm: boolean = false;
  userRole: string | null = null;

  faHome = faHome;
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;
  faTachometerAlt = faTachometerAlt; 
  faUsers = faUsers; 
  faUserCircle = faUserCircle;
  faPlusCircle = faPlusCircle; // Added icon
  faClipboardList = faClipboardList; // Added icon
  faFileAlt = faFileAlt; // Added icon
  faListAlt = faListAlt; // Added icon
  faCalendarAlt = faCalendarAlt;
  faFileInvoiceDollar = faFileInvoiceDollar;
  
  constructor(private router: Router, private eRef: ElementRef) {}

  ngOnInit() {
    this.checkLoginStatus(); // Vérifie si l'utilisateur est connecté lors de l'initialisation
  }

  // Vérifie l'état de connexion et le rôle
  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('token');
    this.userRole = localStorage.getItem('role');
  }

  // Vérifie si l'utilisateur est un administrateur
  isAdmin(): boolean {
    return this.userRole === 'administrateur';
  }

  // Vérifie si l'utilisateur est un agent
  isAgent(): boolean {
    return this.userRole === 'agent';
  }

  isClient(): boolean {
    return this.userRole === 'client';
  }

  // Déconnexion
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.isLoggedIn = false;
    this.userRole = null;
    this.router.navigate(['/login']);
  }

  // Basculer l'affichage du formulaire de profil
  toggleProfileForm() {
    this.showProfileForm = !this.showProfileForm;
  }

  // Fermer le formulaire si clic en dehors
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (this.showProfileForm && !this.eRef.nativeElement.contains(event.target)) {
      this.showProfileForm = false;
    }
  }
}
