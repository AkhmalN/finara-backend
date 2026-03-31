export type CreateTransactionDTO = {
  user_id: string;
  account_id: string;
  category_id: string;
  amount: number;
  description?: string;
  date: Date;
  notes?: string;
  receipt?: string;
};

export type UpdateTransactionDTO = {
  user_id?: string;
  account_id?: string;
  category_id?: string;
  amount?: number;
  description?: string;
  date?: Date;
  notes?: string;
  receipt?: string;
};

export type GetTransactionsQueryDTO = {
  page?: number;
  limit?: number;
  user_id?: string;
  account_id?: string;
  category_id?: string;
  start_date?: string;
  end_date?: string;
};
