import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth.middleware";
import {
  validateData,
  validateQuery,
} from "@/middlewares/validation.middleware";
import BudgetController from "@/modules/budgets/budget.controller";
import {
  budgetsQuerySchema,
  createBudgetSchema,
  updateBudgetSchema,
} from "@/modules/budgets/budget.validators";

const router = Router();

router.use(authMiddleware);

router.get("/", validateQuery(budgetsQuerySchema), BudgetController.getBudgets);
router.get("/:id", BudgetController.getBudgetById);
router.post(
  "/",
  validateData(createBudgetSchema),
  BudgetController.createBudget,
);
router.patch(
  "/:id",
  validateData(updateBudgetSchema),
  BudgetController.updateBudget,
);
router.delete("/:id", BudgetController.deleteBudget);

export default router;
