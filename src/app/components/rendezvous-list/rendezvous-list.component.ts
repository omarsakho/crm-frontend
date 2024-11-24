import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { RendezvousService } from '../../services/rendezvous.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rendezvous-list',
  templateUrl: './rendezvous-list.component.html',
})
export class RendezvousListComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin],
    initialView: 'dayGridMonth',
    locale: 'fr',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    eventTimeFormat: { // Format de l'heure dans les événements
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false
    },
    events: [],
    eventClick: this.handleEventClick.bind(this)
  };

  constructor(private rendezvousService: RendezvousService, private router: Router) {}

  ngOnInit(): void {
    this.rendezvousService.getRendezVousList().subscribe(
      (response) => {
        const events = response.rendezvous.map((rendezvous: any) => {
          // Vérifier si le rendez-vous est à venir ou passé
          const isUpcoming = new Date(rendezvous.date_rendezvous) > new Date();
          
          return {
            title: `Client: ${rendezvous.client ? rendezvous.client.nom : 'Client'} | Lieu: ${rendezvous.lieu || 'N/A'}`,
            start: rendezvous.date_rendezvous, // Assurez-vous que `date_rendezvous` inclut date + heure
            allDay: false, // False pour afficher l'heure
            extendedProps: {
              id: rendezvous.id,
              lieu: rendezvous.lieu,
              agent: rendezvous.agent?.nom,
              client: rendezvous.client?.nom,
              isUpcoming: isUpcoming
            },
            description: `Lieu: ${rendezvous.lieu || 'N/A'} | Agent: ${rendezvous.agent?.nom || 'N/A'}`,
            // Appliquer des couleurs différentes en fonction de l'état de l'événement
            backgroundColor: isUpcoming ? 'green' : 'red',  // Vert pour les rendez-vous à venir, rouge pour les passés
            borderColor: isUpcoming ? 'darkgreen' : 'darkred'
          };
        });
        this.calendarOptions.events = events;
      },
      (error) => {
        console.error('Erreur lors de la récupération des rendez-vous', error);
      }
    );
  }

  handleEventClick(info: any): void {
    const rendezvousId = info.event.extendedProps.id;
    const lieu = info.event.extendedProps.lieu;
    const agent = info.event.extendedProps.agent;
    const client = info.event.extendedProps.client;
    const isUpcoming = info.event.extendedProps.isUpcoming;

    // Afficher les informations du rendez-vous
    alert(`Détails du rendez-vous:
           ID: ${rendezvousId}
           Client: ${client || 'N/A'}
           Lieu: ${lieu || 'N/A'}
           Agent: ${agent || 'N/A'}
           Date: ${info.event.start}`);
    
    // Si le rendez-vous est à venir, proposer l'option de modification
    if (isUpcoming) {
      const modifyButton = confirm("Voulez-vous modifier ce rendez-vous ?");
      
      if (modifyButton) {
        // Rediriger vers la page de modification avec l'ID du rendez-vous
        this.router.navigate(['/rendezvous', rendezvousId, 'edit']);
      }
    } else {
      alert("Ce rendez-vous est déjà passé, vous ne pouvez pas le modifier.");
    }
  }

  // Méthode pour annuler un rendez-vous
  annulerRendezVous(id: number): void {
    this.rendezvousService.annulerRendezVous(id).subscribe(
      (response) => {
        console.log('Rendez-vous annulé avec succès', response);
        
        // Supprimer l'événement du calendrier
        if (Array.isArray(this.calendarOptions.events)) {
          this.calendarOptions.events = this.calendarOptions.events.filter(
            (event: any) => event.extendedProps.id !== id
          );
        } else {
          console.error('Les événements ne sont pas sous forme de tableau.');
        }
      },
      (error) => {
        console.error('Erreur lors de l\'annulation du rendez-vous', error);
      }
    );
  }
}
