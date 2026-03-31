import db from "@/lib/postgres";
import TransactionEntity from "@/modules/transactions/transaction.entities";
import { GetTransactionsQueryDTO } from "@/modules/transactions/transaction.dto";

const TransactionRepository = {
  findById: async (id: string) => {
    const { rows } = await db.query(
      "SELECT id, user_id, account_id, category_id, amount, description, date, notes, receipt, created_at, updated_at FROM transactions WHERE id = $1",
      [id],
    );
    return rows[0] || null;
  },

  findByUserId: async (userId: string) => {
    const { rows } = await db.query(
      "SELECT id, user_id, account_id, category_id, amount, description, date, notes, receipt, created_at, updated_at FROM transactions WHERE user_id = $1 ORDER BY date DESC",
      [userId],
    );
    return rows || [];
  },

  findByAccountId: async (accountId: string) => {
    const { rows } = await db.query(
      "SELECT id, user_id, account_id, category_id, amount, description, date, notes, receipt, created_at, updated_at FROM transactions WHERE account_id = $1 ORDER BY date DESC",
      [accountId],
    );
    return rows || [];
  },

  findMany: async (query: GetTransactionsQueryDTO) => {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const offset = (page - 1) * limit;

    let whereConditions: string[] = [];
    let params: any[] = [];
    let paramIndex = 1;

    if (query.user_id) {
      whereConditions.push(`user_id = $${paramIndex}`);
      params.push(query.user_id);
      paramIndex++;
    }

    if (query.account_id) {
      whereConditions.push(`account_id = $${paramIndex}`);
      params.push(query.account_id);
      paramIndex++;
    }

    if (query.category_id) {
      whereConditions.push(`category_id = $${paramIndex}`);
      params.push(query.category_id);
      paramIndex++;
    }

    if (query.start_date) {
      whereConditions.push(`date >= $${paramIndex}`);
      params.push(new Date(query.start_date));
      paramIndex++;
    }

    if (query.end_date) {
      whereConditions.push(`date <= $${paramIndex}`);
      params.push(new Date(query.end_date));
      paramIndex++;
    }

    const whereClause =
      whereConditions.length > 0
        ? `WHERE ${whereConditions.join(" AND ")}`
        : "";

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM transactions ${whereClause}`;
    const { rows: countRows } = await db.query(countQuery, params);
    const total = parseInt(countRows[0].total, 10);

    // Get paginated data
    const dataQuery = `
      SELECT id, user_id, account_id, category_id, amount, description, date, notes, receipt, created_at, updated_at
      FROM transactions
      ${whereClause}
      ORDER BY date DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    const dataParams = [...params, limit, offset];
    const { rows } = await db.query(dataQuery, dataParams);

    return {
      data: rows,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  insert: async (data: TransactionEntity) => {
    const { rows } = await db.query(
      "INSERT INTO transactions (id, user_id, account_id, category_id, amount, description, date, notes, receipt, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [
        data.id,
        data.user_id,
        data.account_id,
        data.category_id,
        data.amount,
        data.description || null,
        data.date,
        data.notes || null,
        data.receipt || null,
        data.created_at,
        data.updated_at,
      ],
    );
    return rows[0];
  },

  update: async (id: string, data: Partial<TransactionEntity>) => {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (data.user_id !== undefined) {
      updates.push(`user_id = $${paramIndex}`);
      values.push(data.user_id);
      paramIndex++;
    }

    if (data.account_id !== undefined) {
      updates.push(`account_id = $${paramIndex}`);
      values.push(data.account_id);
      paramIndex++;
    }

    if (data.category_id !== undefined) {
      updates.push(`category_id = $${paramIndex}`);
      values.push(data.category_id);
      paramIndex++;
    }

    if (data.amount !== undefined) {
      updates.push(`amount = $${paramIndex}`);
      values.push(data.amount);
      paramIndex++;
    }

    if (data.description !== undefined) {
      updates.push(`description = $${paramIndex}`);
      values.push(data.description || null);
      paramIndex++;
    }

    if (data.date !== undefined) {
      updates.push(`date = $${paramIndex}`);
      values.push(data.date);
      paramIndex++;
    }

    if (data.notes !== undefined) {
      updates.push(`notes = $${paramIndex}`);
      values.push(data.notes || null);
      paramIndex++;
    }

    if (data.receipt !== undefined) {
      updates.push(`receipt = $${paramIndex}`);
      values.push(data.receipt || null);
      paramIndex++;
    }

    updates.push(`updated_at = $${paramIndex}`);
    values.push(new Date());
    paramIndex++;

    if (updates.length === 0) {
      return findById(id);
    }

    values.push(id);

    const { rows } = await db.query(
      `UPDATE transactions SET ${updates.join(", ")} WHERE id = $${paramIndex} RETURNING *`,
      values,
    );

    return rows[0];
  },

  delete: async (id: string) => {
    const { rows } = await db.query(
      "DELETE FROM transactions WHERE id = $1 RETURNING id",
      [id],
    );
    return rows[0] || null;
  },
};

export default TransactionRepository;
function findById(id: string) {
  throw new Error("Function not implemented.");
}
