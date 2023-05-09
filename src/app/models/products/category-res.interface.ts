import { CategoryType } from "./category.interface";

export interface CategoryRes {
    _id: string,
    name: string,
    image: string,
    type: CategoryType
}
