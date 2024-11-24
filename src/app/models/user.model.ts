// src/app/models/user.model.ts
export interface User {
    id: number;
    nom: string;
    email: string;
    role: 'administrateur' | 'agent' | 'client'; // Vous pouvez l'adapter selon vos besoins
}
