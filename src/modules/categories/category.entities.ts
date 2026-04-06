export type EnumCategoryType = "income" | "expense";

export interface CategoryEntity {
  id: string;
  userId: string;
  name: string;
  type: EnumCategoryType;
  createdAt: Date;
  updatedAt: Date;
}
