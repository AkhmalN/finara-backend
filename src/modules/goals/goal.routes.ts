import { Router } from "express";
import { authMiddleware } from "@/middlewares/auth.middleware";
import {
  validateData,
  validateQuery,
} from "@/middlewares/validation.middleware";
import GoalController from "@/modules/goals/goal.controller";
import {
  createGoalContributionSchema,
  createGoalSchema,
  goalsQuerySchema,
  updateGoalSchema,
} from "@/modules/goals/goal.validators";

const router = Router();

router.use(authMiddleware);

router.get("/", validateQuery(goalsQuerySchema), GoalController.getGoals);
router.get("/:id", GoalController.getGoalById);
router.post("/", validateData(createGoalSchema), GoalController.createGoal);
router.patch("/:id", validateData(updateGoalSchema), GoalController.updateGoal);
router.delete("/:id", GoalController.deleteGoal);
router.get("/:id/contributions", GoalController.getGoalContributions);
router.post(
  "/:id/contributions",
  validateData(createGoalContributionSchema),
  GoalController.addGoalContribution,
);

export default router;
