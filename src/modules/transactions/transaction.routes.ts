import { validateData } from "@/middlewares/validation.middleware";
import TransactionController from "@/modules/transactions/transaction.controller";
import {
  createTransactionSchema,
  updateTransactionSchema,
  getTransactionsQuerySchema,
} from "@/modules/transactions/transaction.validators";
import { Router } from "express";

const router = Router();

// Create transaction
router.post(
  "/",
  validateData(createTransactionSchema),
  TransactionController.createTransaction,
);

// Get all transactions with filters
router.get(
  "/",
  validateData(getTransactionsQuerySchema),
  TransactionController.getTransactions,
);

// Get transaction by ID
router.get("/:id", TransactionController.getTransaction);

// Get transactions by user ID
router.get("/user/:userId", TransactionController.getTransactionsByUser);

// Get transactions by account ID
router.get(
  "/account/:accountId",
  TransactionController.getTransactionsByAccount,
);

// Update transaction
router.put(
  "/:id",
  validateData(updateTransactionSchema),
  TransactionController.updateTransaction,
);

// Delete transaction
router.delete("/:id", TransactionController.deleteTransaction);

export default router;
