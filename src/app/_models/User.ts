import { Photo } from './Photo';

export interface User {
    id: string;
    username: string;
    knownAs: string;
    age: number;
    gemder: string;
    created: Date;
    lastActive: Date;
    photoUrl: string;
    city: string;
    country: string;
    interests?: string;
    introduction?: string;
    lookingFor?: string;
    photos?: Photo[];
}
