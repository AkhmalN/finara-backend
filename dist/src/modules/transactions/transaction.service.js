"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const transaction_repository_1 = __importDefault(require("@/modules/transactions/transaction.repository"));
const TransactionService = {
    createTransaction: async (data) => {
        const transactionData = {
            id: crypto.randomUUID(),
            user_id: data.user_id,
            account_id: data.account_id,
            category_id: data.category_id,
            amount: data.amount,
            description: data.description,
            date: data.date,
            notes: data.notes,
            receipt: data.receipt,
            created_at: new Date(),
            updated_at: new Date(),
        };
        const result = await transaction_repository_1.default.insert(transactionData);
        if (!result) {
            throw new Error("Failed to create transaction");
        }
        return result;
    },
    getTransactionById: async (id) => {
        const transaction = await transaction_repository_1.default.findById(id);
        if (!transaction) {
            throw new Error("Transaction not found");
        }
        return transaction;
    },
    getTransactions: async (query) => {
        const transactions = await transaction_repository_1.default.findMany(query);
        return transactions;
    },
    getTransactionsByUserId: async (userId) => {
        const transactions = await transaction_repository_1.default.findByUserId(userId);
        if (!transactions || transactions.length === 0) {
            throw new Error("No transactions found for this user");
        }
        return transactions;
    },
    getTransactionsByAccountId: async (accountId) => {
        const transactions = await transaction_repository_1.default.findByAccountId(accountId);
        if (!transactions || transactions.length === 0) {
            throw new Error("No transactions found for this account");
        }
        return transactions;
    },
    updateTransaction: async (id, data) => {
        const existingTransaction = await transaction_repository_1.default.findById(id);
        if (!existingTransaction) {
            throw new Error("Transaction not found");
        }
        const updateData = {
            category_id: data.category_id,
            amount: data.amount,
            description: data.description,
            date: data.date,
            notes: data.notes,
            receipt: data.receipt,
        };
        const result = await transaction_repository_1.default.update(id, updateData);
        if (!result) {
            throw new Error("Failed to update transaction");
        }
        return result;
    },
    deleteTransaction: async (id) => {
        const transaction = await transaction_repository_1.default.findById(id);
        if (!transaction) {
            throw new Error("Transaction not found");
        }
        const result = await transaction_repository_1.default.delete(id);
        if (!result) {
            throw new Error("Failed to delete transaction");
        }
        return result;
    },
};
exports.default = TransactionService;
