export interface Review {
    id: string;
    rating: number;
    comment?: string;

    createdAt: string;

    user: {
        name: string;
    };
}