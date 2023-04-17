export interface Category {
    id: string,
    name: string,
    type: CategoryType[],
    isEditing?: boolean;
}

export interface CategoryType {
    name?: string,
    typeName: string,
    brands: string[],
    materials: string[],
    shapes: string[],
    extras: string[]
}
