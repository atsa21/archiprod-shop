export interface Category {
    id: string,
    name: string,
    type: Type[],
    isEditing?: boolean;
}

export interface CategoryForm {
    name: string,
    type: Type
}

export interface Type {
    typeName: string,
    materials: string[],
    shapes: string[],
    extras: string[]
}
