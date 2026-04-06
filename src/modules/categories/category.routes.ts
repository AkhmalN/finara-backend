import { Router } from "express";
import CategoryController from "@/modules/categories/category.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { validateData } from "@/middlewares/validation.middleware";
import { CreateCategorySchema } from "./category.validators";

const router = Router();

router.use(authMiddleware);
// GET: Get all categories for the user
router.get("/", CategoryController.getCategoriesByUser);

// GET: Get a specific category by ID
router.get("/:id", CategoryController.getCategoryById);

// POST: Create a new category
router.post(
  "/",
  validateData(CreateCategorySchema),
  CategoryController.createCategory,
);

// PATCH: Update a category
router.patch("/:id", CategoryController.updateCategory);

// DELETE: Delete a category
router.delete("/:id", CategoryController.deleteCategory);

export default router;
