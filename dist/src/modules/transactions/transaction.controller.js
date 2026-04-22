"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_service_1 = __importDefault(require("@/modules/transactions/transaction.service"));
const http_status_codes_1 = require("http-status-codes");
const TransactionController = {
    createTransaction: async (req, res) => {
        try {
            const transaction = await transaction_service_1.default.createTransaction(req.body);
            res.status(http_status_codes_1.StatusCodes.CREATED).json({
                success: true,
                message: "Transaction created successfully",
                data: transaction,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Failed to create transaction",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    getTransaction: async (req, res) => {
        const { id } = req.params;
        try {
            const transaction = await transaction_service_1.default.getTransactionById(id);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: "Transaction retrieved successfully",
                data: transaction,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Failed to retrieve transaction",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    getTransactions: async (req, res) => {
        try {
            const result = await transaction_service_1.default.getTransactions(req.query);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: "Transactions retrieved successfully",
                data: result.data,
                meta: result.meta,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Failed to retrieve transactions",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    getTransactionsByUser: async (req, res) => {
        const { userId } = req.params;
        try {
            const transactions = await transaction_service_1.default.getTransactionsByUserId(userId);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: "User transactions retrieved successfully",
                data: transactions,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Failed to retrieve user transactions",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    getTransactionsByAccount: async (req, res) => {
        const { accountId } = req.params;
        try {
            const transactions = await transaction_service_1.default.getTransactionsByAccountId(accountId);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: "Account transactions retrieved successfully",
                data: transactions,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Failed to retrieve account transactions",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    updateTransaction: async (req, res) => {
        const { id } = req.params;
        try {
            const transaction = await transaction_service_1.default.updateTransaction(id, req.body);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: "Transaction updated successfully",
                data: transaction,
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Failed to update transaction",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
    deleteTransaction: async (req, res) => {
        const { id } = req.params;
        try {
            await transaction_service_1.default.deleteTransaction(id);
            res.status(http_status_codes_1.StatusCodes.OK).json({
                success: true,
                message: "Transaction deleted successfully",
            });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: "Failed to delete transaction",
                error: error instanceof Error ? error.message : "Unknown error",
            });
        }
    },
};
exports.default = TransactionController;
