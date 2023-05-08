export interface Category {
    id: string,
    name: string,
    type: CategoryType[],
    isEditing?: boolean,
    link?: string
}

export interface CategoryType {
    name?: string,
    typeName: string,
    brands: string[],
    materials: string[],
    shapes: string[],
    extras: string[],
    link?: string
}
