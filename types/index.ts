export interface Artist {
    _id: string;
    name: string;
    slug: { current: string };
    bio?: string;
    image?: any;
    artworks?: Artwork[];
}

export interface Artwork {
    _id: string;
    title: string;
    slug: { current: string };
    artist?: Artist;
    artworkType?: 'single' | 'diptych' | 'triptych';
    image?: any;
    panels?: any[];
    year?: string;
    medium?: string;
    dimensions?: string;
    price?: number;
    description?: string;
}

export interface Exhibition {
    _id: string;
    title: string;
    slug: { current: string };
    theme?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
    openHours?: string;
    contactNumber?: string;
    featuredImage?: any;
    artworks?: Artwork[];
}
