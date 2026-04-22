"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = __importDefault(require("@/modules/categories/category.controller"));
const auth_middleware_1 = require("@/middlewares/auth.middleware");
const validation_middleware_1 = require("@/middlewares/validation.middleware");
const category_validators_1 = require("./category.validators");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
// GET: Get all categories for the user
router.get("/", category_controller_1.default.getCategoriesByUser);
// GET: Get a specific category by ID
router.get("/:id", category_controller_1.default.getCategoryById);
// POST: Create a new category
router.post("/", (0, validation_middleware_1.validateData)(category_validators_1.CreateCategorySchema), category_controller_1.default.createCategory);
// PATCH: Update a category
router.patch("/:id", category_controller_1.default.updateCategory);
// DELETE: Delete a category
router.delete("/:id", category_controller_1.default.deleteCategory);
exports.default = router;
