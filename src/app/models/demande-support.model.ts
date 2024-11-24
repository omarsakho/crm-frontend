export interface DemandeSupport {
    id: number;
    client_id: number;
    agent_id?: number;
    description: string;
    priorite: string;
    type_demande: string;
    statut: string;
    dateCreation: string;
    dateResolution?: string;
  }
  