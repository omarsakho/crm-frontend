import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  statistics: any;
  ticketChart: any;
  invoiceChart: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getStatistics().subscribe(data => {
      this.statistics = data;
      this.createTicketChart();
      this.createInvoiceChart();
    });
  }

  // Graphique pour les tickets
  createTicketChart(): void {
    const ctx = document.getElementById('ticketChart') as HTMLCanvasElement;
    this.ticketChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['En attente', 'En cours', 'Résolu'],
        datasets: [{
          data: [
            this.statistics.tickets.en_attente,
            this.statistics.tickets.en_cours,
            this.statistics.tickets.resolu
          ],
          backgroundColor: ['#f39c12', '#3498db', '#2ecc71']
        }]
      }
    });
  }

  // Graphique pour les factures
  createInvoiceChart(): void {
    const ctx = document.getElementById('invoiceChart') as HTMLCanvasElement;
    this.invoiceChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['En attente', 'Payée', 'En retard'],
        datasets: [{
          data: [
            this.statistics.factures.en_attente,
            this.statistics.factures.payees,
            this.statistics.factures.en_retard
          ],
          backgroundColor: ['#f39c12', '#2ecc71', '#e74c3c']
        }]
      }
    });
  }
}
