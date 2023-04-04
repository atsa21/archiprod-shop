export interface BrandListRes {
    data: Brand[],
    message: string,
    totalElements: number
}

export interface Brand {
    id?: string,
    _id?: string,
    name: string;
    country: string;
    website: string;
    logo: string;
}