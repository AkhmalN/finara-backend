import {
  validateData,
  validateQuery,
} from "@/middlewares/validation.middleware";
import { authMiddleware } from "@/middlewares/auth.middleware";
import TransactionController from "@/modules/transactions/transaction.controller";
import {
  createTransactionSchema,
  updateTransactionSchema,
  getTransactionsQuerySchema,
} from "@/modules/transactions/transaction.validators";
import { Router } from "express";

const router = Router();

router.use(authMiddleware);

// Create transaction
router.post(
  "/create",
  validateData(createTransactionSchema),
  TransactionController.createTransaction,
);

// Get all transactions with filters
router.get(
  "/",
  validateQuery(getTransactionsQuerySchema),
  TransactionController.getTransactions,
);

// Get transaction by ID
router.get("/detail/:id", TransactionController.getTransaction);

// Get transactions by user ID
router.get("/user/:userId", TransactionController.getTransactionsByUser);

// Get transactions by account ID
router.get(
  "/account/:accountId",
  TransactionController.getTransactionsByAccount,
);

// Partial update transaction
router.patch(
  "/edit/:id",
  validateData(updateTransactionSchema),
  TransactionController.updateTransaction,
);

// Temporary backward compatibility for existing PUT clients
// router.put(
//   "/:id",
//   validateData(updateTransactionSchema),
//   TransactionController.updateTransaction,
// );

// Delete transaction
router.delete("/delete/:id", TransactionController.deleteTransaction);

export default router;
