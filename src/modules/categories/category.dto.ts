import { EnumCategoryType } from "./category.entities";

export interface CreateCategoryDTO {
  name: string;
  type: EnumCategoryType;
}

export interface UpdateCategoryDTO {
  name?: string;
  type?: EnumCategoryType;
}

export interface CategoriesQueryDTO {
  page?: number;
  limit?: number;
  type?: EnumCategoryType;
}
