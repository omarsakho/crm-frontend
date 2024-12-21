import { Component, OnInit } from '@angular/core';
import { FactureService } from '../../services/facture.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar'; // Pour afficher une notification après la mise à jour

@Component({
  selector: 'app-facture-list',
  templateUrl: './facture-list.component.html',
  styleUrls: ['./facture-list.component.css']
})
export class FactureListComponent implements OnInit {
  factures: MatTableDataSource<any> = new MatTableDataSource();
  ticketId!: number;

  displayedColumns: string[] = ['id', 'montant', 'client', 'ticket', 'dateEmission', 'dateLimite', 'etat_paiement', 'datePaiement', 'actions'];

  constructor(
    private factureService: FactureService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar // Utilisé pour les notifications
  ) {}

  ngOnInit(): void {
    this.ticketId = this.route.snapshot.params['ticketId'];

    this.factureService.getFacturesByTicket(this.ticketId).subscribe(
      (data) => {
        this.factures.data = data.factures;
      },
      (error) => {
        console.error('Erreur lors de la récupération des factures', error);
      }
    );
  }

  isClient(): boolean {
    return localStorage.getItem('role') === 'client';
  }
}
