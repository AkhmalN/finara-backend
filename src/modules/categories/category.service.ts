import CategoryRepository from "@/modules/categories/category.repository";
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from "@/modules/categories/category.dto";
import { CategoryEntity } from "./category.entities";

const CategoryService = {
  getCategoriesByUser: async (userId: string) => {
    return await CategoryRepository.findByUserId(userId);
  },

  getCategoryById: async (categoryId: string) => {
    return await CategoryRepository.findById(categoryId);
  },

  createCategory: async (userId: string, dto: CreateCategoryDTO) => {
    const existing = await CategoryRepository.findByUserIdAndName(
      userId,
      dto.name,
    );
    if (existing) {
      throw new Error(`Category "${dto.name}" already exists`);
    }

    const categoryData: CategoryEntity = {
      id: crypto.randomUUID(),
      userId,
      name: dto.name,
      type: dto.type,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return await CategoryRepository.insert(categoryData);
  },

  updateCategory: async (categoryId: string, dto: UpdateCategoryDTO) => {
    const existingCategory = await CategoryRepository.findById(categoryId);
    if (!existingCategory) {
      throw new Error("Category not found");
    }

    const updatedCategory: Partial<CategoryEntity> = {
      name: dto.name ?? existingCategory.name,
      type: dto.type ?? existingCategory.type,
      updatedAt: new Date(),
    };

    return await CategoryRepository.update(categoryId, updatedCategory);
  },

  deleteCategory: async (categoryId: string) => {
    return await CategoryRepository.delete(categoryId);
  },
};

export default CategoryService;
