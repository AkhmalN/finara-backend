interface TransactionEntity {
  id?: string;
  user_id: string;
  account_id: string;
  category_id: string;
  amount: number;
  description?: string;
  date: Date;
  notes?: string;
  receipt?: string;
  created_at?: Date;
  updated_at?: Date;
}

export default TransactionEntity;
