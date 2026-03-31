import { Request, Response } from "express";
import TransactionService from "@/modules/transactions/transaction.service";
import { StatusCodes } from "http-status-codes";

const TransactionController = {
  createTransaction: async (req: Request, res: Response) => {
    try {
      const transaction = await TransactionService.createTransaction(req.body);
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Transaction created successfully",
        data: transaction,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to create transaction",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  getTransaction: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const transaction = await TransactionService.getTransactionById(
        id as string,
      );
      res.status(StatusCodes.OK).json({
        success: true,
        message: "Transaction retrieved successfully",
        data: transaction,
      });
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Failed to retrieve transaction",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  getTransactions: async (req: Request, res: Response) => {
    try {
      const result = await TransactionService.getTransactions(req.query as any);
      res.status(StatusCodes.OK).json({
        success: true,
        message: "Transactions retrieved successfully",
        data: result.data,
        meta: result.meta,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to retrieve transactions",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  getTransactionsByUser: async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
      const transactions = await TransactionService.getTransactionsByUserId(
        userId as string,
      );
      res.status(StatusCodes.OK).json({
        success: true,
        message: "User transactions retrieved successfully",
        data: transactions,
      });
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Failed to retrieve user transactions",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  getTransactionsByAccount: async (req: Request, res: Response) => {
    const { accountId } = req.params;

    try {
      const transactions = await TransactionService.getTransactionsByAccountId(
        accountId as string,
      );
      res.status(StatusCodes.OK).json({
        success: true,
        message: "Account transactions retrieved successfully",
        data: transactions,
      });
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Failed to retrieve account transactions",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  updateTransaction: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const transaction = await TransactionService.updateTransaction(
        id as string,
        req.body,
      );
      res.status(StatusCodes.OK).json({
        success: true,
        message: "Transaction updated successfully",
        data: transaction,
      });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Failed to update transaction",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },

  deleteTransaction: async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      await TransactionService.deleteTransaction(id as string);
      res.status(StatusCodes.OK).json({
        success: true,
        message: "Transaction deleted successfully",
      });
    } catch (error) {
      res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Failed to delete transaction",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
};

export default TransactionController;
