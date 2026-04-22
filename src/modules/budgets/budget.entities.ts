export interface BudgetEntity {
  id: string;
  userId: string;
  categoryId: string;
  amount: string;
  month: number;
  year: number;
  spent: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BudgetWithDetailsEntity extends BudgetEntity {
  categoryName: string;
  categoryType: "income" | "expense";
  remainingAmount: string;
  utilizationPercentage: number;
}
