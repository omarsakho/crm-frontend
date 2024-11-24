export interface Ticket {
  id: number;
  client_id: number;
  agent_id?: number;
  description: string;
  priorite: 'faible' | 'moyenne' | 'haute';
  type_demande: 'technique' | 'commercial' | 'autre';
  statut: 'en_cours' | 'résolu' | 'en_attente';
  dateCreation: string;
  dateResolution?: string; // date de résolution
  nomAgent?: string; // nom de l'agent
}
