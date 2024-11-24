import { Component, OnInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from '../../models/ticket.model';
import { MatTableDataSource } from '@angular/material/table';
import { faPlus, faEdit, faTrash, faCheck, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { AssignAgentDialogComponent } from '../assign-agent-dialog/assign-agent-dialog.component';
import { faPlusCircle, faArchive } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router'; // Ajout de l'importation du Router

@Component({
  selector: 'app-liste-tickets',
  templateUrl: './liste-tickets.component.html',
})
export class ListeTicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  dataSource = new MatTableDataSource<Ticket>();
  displayedColumns: string[] = ['id', 'description', 'priorite', 'statut', 'dateCreation', 'dateResolution', 'actions'];
  expandedTickets: Set<number> = new Set(); // Suivi des tickets développés

  filtres = {
    statut: '',
    priorite: '',
    date: '',
  };
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  faCheck = faCheck;
  faPlusCircle = faPlusCircle;
  faCalendar = faCalendar;
  faArchive = faArchive;

  constructor(private ticketService: TicketService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.obtenirTickets();
  }

  obtenirTickets() {
    this.ticketService.obtenirTickets(this.filtres).subscribe(
      (data) => {
        this.tickets = data.tickets;
        this.dataSource.data = this.tickets;
      },
      (error) => {
        console.error('Erreur lors de la récupération des tickets:', error);
      }
    );
  }

  toggleExpand(ticketId: number): void {
    if (this.expandedTickets.has(ticketId)) {
      this.expandedTickets.delete(ticketId);
    } else {
      this.expandedTickets.add(ticketId);
    }
  }

  isExpanded(ticketId: number): boolean {
    return this.expandedTickets.has(ticketId);
  }

  // Méthode pour créer une facture
  createFacture(ticket: Ticket): void {
    this.router.navigate(['/tickets', ticket.id, 'factures', 'create']);
  }

  assignTicket(ticket: Ticket) {
    const dialogRef = this.dialog.open(AssignAgentDialogComponent, {
      width: '250px',
      data: { ticketId: ticket.id }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      // Si un agent est sélectionné et que la fermeture du dialogue est confirmée
      if (result) {
        this.ticketService.affecterTicket(ticket.id, result.agentId).subscribe(
          response => {
            console.log('Ticket affecté avec succès', response);
            // Mettez à jour l'agent du ticket
            ticket.agent_id = result.agentId;
          },
          error => {
            console.error('Erreur lors de l\'affectation du ticket:', error);
          },
          () => {
            // Ajouter un délai avant de recharger la liste des tickets
            setTimeout(() => {
              this.obtenirTickets();
            }, 1000); // 2 secondes de délai
          }
        );
      } else {
        // Ajouter un délai avant de recharger la liste des tickets si aucun agent n'est affecté
        setTimeout(() => {
          this.obtenirTickets();
        }, 1000); // 2 secondes de délai
      }
    });
  }
  
  resolveTicket(ticket: Ticket) {
    this.ticketService.mettreAJourStatut(ticket.id, { statut: 'résolu' }).subscribe(
      (response) => {
        console.log('Ticket résolu:', response);
        ticket.dateResolution = new Date().toISOString().split('T')[0];
        this.obtenirTickets();
      },
      (error) => {
        console.error('Erreur lors de la résolution du ticket:', error);
      }
    );
  }

  archiverTicket(ticketId: number): void {
    this.ticketService.archiverTicket(ticketId).subscribe(
      response => {
        console.log('Ticket archivé avec succès');
        this.obtenirTickets();  // Recharger la liste des tickets après archivage
      },
      error => {
        console.error('Erreur lors de l\'archivage du ticket', error);
      }
    );
  }
  
  

  truncateText(text: string, limit: number, ticketId: number): string {
    if (this.isExpanded(ticketId) || text.length <= limit) {
      return text;
    } else {
      return text.substring(0, limit) + '...';
    }
  }

  isAdmin(): boolean {
    return localStorage.getItem('role') === 'administrateur';
  }

  isAgent(): boolean {
    return localStorage.getItem('role') === 'agent';
  }

  isClient(): boolean {
    return localStorage.getItem('role') === 'client';
  }

  planifierRendezvous(ticketId: number): void {
    this.router.navigate(['/rendezvous', ticketId]);
  }

}
