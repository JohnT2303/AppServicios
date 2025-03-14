export type UserRole = 'client' | 'provider';

export interface Address {
    id: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    isDefault: boolean;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}

export interface Service {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    providerId: string;
    rating: number;
    reviews: number;
    distance?: number;
}

export interface ServiceRequest {
    id: string;
    serviceId: string;
    clientId: string;
    providerId: string;
    status: 'pending' | 'accepted' | 'rejected' | 'counter-offer' | 'completed' | 'cancelled';
    address: Address;
    date: string;
    price: number;
    notes?: string;
}

export interface Provider {
    id: string;
    name: string;
    email: string;
    phone: string;
    categories: string[];
    rating: number;
    reviews: number;
    distance?: number;
    availability: {
        [key: string]: {
            start: string;
            end: string;
        }[];
    };
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    addresses: Address[];
    phone?: string;
    profileImage?: string;
} 