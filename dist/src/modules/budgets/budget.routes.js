"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("@/middlewares/auth.middleware");
const validation_middleware_1 = require("@/middlewares/validation.middleware");
const budget_controller_1 = __importDefault(require("@/modules/budgets/budget.controller"));
const budget_validators_1 = require("@/modules/budgets/budget.validators");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.get("/", (0, validation_middleware_1.validateQuery)(budget_validators_1.budgetsQuerySchema), budget_controller_1.default.getBudgets);
router.get("/:id", budget_controller_1.default.getBudgetById);
router.post("/", (0, validation_middleware_1.validateData)(budget_validators_1.createBudgetSchema), budget_controller_1.default.createBudget);
router.patch("/:id", (0, validation_middleware_1.validateData)(budget_validators_1.updateBudgetSchema), budget_controller_1.default.updateBudget);
router.delete("/:id", budget_controller_1.default.deleteBudget);
exports.default = router;
