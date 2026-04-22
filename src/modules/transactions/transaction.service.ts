import {
  CreateTransactionDTO,
  UpdateTransactionDTO,
  GetTransactionsQueryDTO,
} from "@/modules/transactions/transaction.dto";
import TransactionRepository from "@/modules/transactions/transaction.repository";
import TransactionEntity from "@/modules/transactions/transaction.entities";

const TransactionService = {
  createTransaction: async (data: CreateTransactionDTO, user_id: string) => {
    const transactionData: TransactionEntity = {
      id: crypto.randomUUID(),
      user_id: user_id,
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

    const result = await TransactionRepository.insert(transactionData);

    if (!result) {
      throw new Error("Failed to create transaction");
    }

    return result;
  },

  getTransactionById: async (id: string) => {
    const transaction = await TransactionRepository.findById(id);

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    return transaction;
  },

  getTransactions: async (query: GetTransactionsQueryDTO) => {
    const transactions = await TransactionRepository.findMany(query);
    return transactions;
  },

  getTransactionsByUserId: async (userId: string) => {
    const transactions = await TransactionRepository.findByUserId(userId);

    if (!transactions || transactions.length === 0) {
      throw new Error("No transactions found for this user");
    }

    return transactions;
  },

  getTransactionsByAccountId: async (accountId: string) => {
    const transactions = await TransactionRepository.findByAccountId(accountId);

    if (!transactions || transactions.length === 0) {
      throw new Error("No transactions found for this account");
    }

    return transactions;
  },

  updateTransaction: async (id: string, data: UpdateTransactionDTO) => {
    const existingTransaction = await TransactionRepository.findById(id);

    if (!existingTransaction) {
      throw new Error("Transaction not found");
    }

    const updateData: Partial<TransactionEntity> = {
      category_id: data.category_id,
      amount: data.amount,
      description: data.description,
      date: data.date,
      notes: data.notes,
      receipt: data.receipt,
    };

    const result = await TransactionRepository.update(id, updateData);

    if (!result) {
      throw new Error("Failed to update transaction");
    }

    return result;
  },

  deleteTransaction: async (id: string) => {
    const transaction = await TransactionRepository.findById(id);

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    const result = await TransactionRepository.delete(id);

    if (!result) {
      throw new Error("Failed to delete transaction");
    }

    return result;
  },
};

export default TransactionService;
