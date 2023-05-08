export interface Category {
    id: string,
    name: string,
    image: string,
    type: CategoryType[],
    isEditing?: boolean,
    link?: string
}

export interface CategoryType {
    name?: string,
    typeName: string,
    image?: string,
    brands: string[],
    materials: string[],
    shapes: string[],
    extras: string[],
    link?: string
}
