export interface CreateBudgetDTO {
  categoryId: string;
  amount: number;
  month: number;
  year: number;
}

export interface UpdateBudgetDTO {
  categoryId?: string;
  amount?: number;
  month?: number;
  year?: number;
}

export interface BudgetsQueryDTO {
  month?: number;
  year?: number;
  categoryId?: string;
}
