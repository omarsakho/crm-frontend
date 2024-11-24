export interface Facture {
  id: number;
  montant: number;
  client: { nom: string };
  ticket: { id: string };
  dateEmission: string;
  dateLimite: string;
  etat_paiement: string;
  datePaiement: string | null;
}

export interface FacturesResponse {
  data: Facture[];
}
