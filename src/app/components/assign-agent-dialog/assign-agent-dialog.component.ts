import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-assign-agent-dialog',
  templateUrl: './assign-agent-dialog.component.html',
})
export class AssignAgentDialogComponent {
  agents: any[] = [];
  selectedAgentId: number | null = null;

  constructor(
    private ticketService: TicketService,
    private dialogRef: MatDialogRef<AssignAgentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { ticketId: number } // Injecte ticketId ici
  ) {}

  ngOnInit() {
    this.ticketService.obtenirAgents().subscribe((response) => {
      this.agents = response.agents;
    });
  }

  onAssign(agentId: number | null) {
    if (agentId) {
      this.ticketService.affecterTicket(this.data.ticketId, agentId).subscribe(
        (response) => {
          console.log('Ticket affecté', response);
          this.dialogRef.close(); // Fermer le dialogue
        },
        (error) => {
          console.error('Erreur lors de l\'affectation du ticket:', error);
        }
      );
    }
  }

  onNoClick(): void {
    this.dialogRef.close(); // Fermer le dialogue sans affectation
  }
}
