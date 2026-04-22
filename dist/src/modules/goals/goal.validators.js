"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGoalContributionSchema = exports.goalsQuerySchema = exports.updateGoalSchema = exports.createGoalSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const goal_entities_1 = require("@/modules/goals/goal.entities");
exports.createGoalSchema = zod_1.default.object({
    name: zod_1.default.string().min(1, "Goal name is required"),
    targetAmount: zod_1.default.coerce.number().positive("Target amount must be greater than 0"),
    currentAmount: zod_1.default.coerce.number().min(0, "Current amount cannot be negative").optional(),
    category: zod_1.default.enum(goal_entities_1.GOAL_CATEGORIES),
    priority: zod_1.default.enum(goal_entities_1.GOAL_PRIORITIES).optional(),
    status: zod_1.default.enum(goal_entities_1.GOAL_STATUSES).optional(),
    deadline: zod_1.default.coerce.date().optional().nullable(),
});
exports.updateGoalSchema = exports.createGoalSchema.partial().refine((value) => Object.keys(value).length > 0, {
    message: "At least one field must be provided",
});
exports.goalsQuerySchema = zod_1.default.object({
    status: zod_1.default.enum(goal_entities_1.GOAL_STATUSES).optional(),
    category: zod_1.default.enum(goal_entities_1.GOAL_CATEGORIES).optional(),
    priority: zod_1.default.enum(goal_entities_1.GOAL_PRIORITIES).optional(),
});
exports.createGoalContributionSchema = zod_1.default.object({
    amount: zod_1.default.coerce.number().positive("Contribution amount must be greater than 0"),
    date: zod_1.default.coerce.date(),
    sourceTransactionId: zod_1.default.string().min(1).optional(),
});
