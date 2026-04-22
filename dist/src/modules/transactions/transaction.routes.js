"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_middleware_1 = require("@/middlewares/validation.middleware");
const transaction_controller_1 = __importDefault(require("@/modules/transactions/transaction.controller"));
const transaction_validators_1 = require("@/modules/transactions/transaction.validators");
const express_1 = require("express");
const router = (0, express_1.Router)();
// Create transaction
router.post("/create", (0, validation_middleware_1.validateData)(transaction_validators_1.createTransactionSchema), transaction_controller_1.default.createTransaction);
// Get all transactions with filters
router.get("/", (0, validation_middleware_1.validateQuery)(transaction_validators_1.getTransactionsQuerySchema), transaction_controller_1.default.getTransactions);
// Get transaction by ID
router.get("/detail/:id", transaction_controller_1.default.getTransaction);
// Get transactions by user ID
router.get("/user/:userId", transaction_controller_1.default.getTransactionsByUser);
// Get transactions by account ID
router.get("/account/:accountId", transaction_controller_1.default.getTransactionsByAccount);
// Partial update transaction
router.patch("/edit/:id", (0, validation_middleware_1.validateData)(transaction_validators_1.updateTransactionSchema), transaction_controller_1.default.updateTransaction);
// Temporary backward compatibility for existing PUT clients
// router.put(
//   "/:id",
//   validateData(updateTransactionSchema),
//   TransactionController.updateTransaction,
// );
// Delete transaction
router.delete("/delete/:id", transaction_controller_1.default.deleteTransaction);
exports.default = router;
