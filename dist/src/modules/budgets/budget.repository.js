"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = __importDefault(require("@/lib/postgres"));
const budgetSelect = `
  SELECT
    b.id,
    b.user_id AS "userId",
    b.category_id AS "categoryId",
    b.amount::text AS amount,
    b.month,
    b.year,
    b.spent::text AS spent,
    b.created_at AS "createdAt",
    b.updated_at AS "updatedAt",
    c.name AS "categoryName",
    c.type AS "categoryType",
    GREATEST(b.amount - b.spent, 0)::text AS "remainingAmount",
    CASE
      WHEN b.amount > 0 THEN ROUND(((b.spent / b.amount) * 100)::numeric, 2)::float
      ELSE 0
    END AS "utilizationPercentage"
  FROM budgets b
  INNER JOIN categories c ON c.id = b.category_id
`;
const BudgetRepository = {
    findById: async (id, userId) => {
        const { rows } = await postgres_1.default.query(`${budgetSelect} WHERE b.id = $1 AND b.user_id = $2`, [id, userId]);
        return rows[0] ?? null;
    },
    findManyByUserId: async (userId, query) => {
        const conditions = ["b.user_id = $1"];
        const values = [userId];
        if (query.month !== undefined) {
            conditions.push(`b.month = $${values.length + 1}`);
            values.push(query.month);
        }
        if (query.year !== undefined) {
            conditions.push(`b.year = $${values.length + 1}`);
            values.push(query.year);
        }
        if (query.categoryId) {
            conditions.push(`b.category_id = $${values.length + 1}`);
            values.push(query.categoryId);
        }
        const { rows } = await postgres_1.default.query(`${budgetSelect} WHERE ${conditions.join(" AND ")} ORDER BY b.year DESC, b.month DESC, c.name ASC`, values);
        return rows;
    },
    findByUniqueKey: async (userId, categoryId, month, year, excludeId) => {
        const values = [userId, categoryId, month, year];
        const conditions = [
            `user_id = $1`,
            `category_id = $2`,
            `month = $3`,
            `year = $4`,
        ];
        if (excludeId) {
            conditions.push(`id <> $${values.length + 1}`);
            values.push(excludeId);
        }
        const { rows } = await postgres_1.default.query(`
        SELECT
          id,
          user_id AS "userId",
          category_id AS "categoryId",
          amount::text AS amount,
          month,
          year,
          spent::text AS spent,
          created_at AS "createdAt",
          updated_at AS "updatedAt"
        FROM budgets
        WHERE ${conditions.join(" AND ")}
      `, values);
        return rows[0] ?? null;
    },
    calculateSpent: async (userId, categoryId, month, year) => {
        const { rows } = await postgres_1.default.query(`
        SELECT COALESCE(SUM(t.amount), 0)::text AS spent
        FROM transactions t
        WHERE t.user_id = $1
          AND t.category_id = $2
          AND EXTRACT(MONTH FROM t.date) = $3
          AND EXTRACT(YEAR FROM t.date) = $4
      `, [userId, categoryId, month, year]);
        return rows[0]?.spent ?? "0";
    },
    insert: async (userId, data) => {
        await postgres_1.default.query(`
        INSERT INTO budgets (id, user_id, category_id, amount, month, year, spent, created_at, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      `, [
            data.id,
            userId,
            data.categoryId,
            data.amount,
            data.month,
            data.year,
            data.spent,
        ]);
        const createdBudget = await BudgetRepository.findById(data.id, userId);
        if (!createdBudget) {
            throw new Error("Failed to create budget");
        }
        return createdBudget;
    },
    update: async (id, userId, data) => {
        const updates = [];
        const values = [];
        if (data.categoryId !== undefined) {
            updates.push(`category_id = $${values.length + 1}`);
            values.push(data.categoryId);
        }
        if (data.amount !== undefined) {
            updates.push(`amount = $${values.length + 1}`);
            values.push(data.amount);
        }
        if (data.month !== undefined) {
            updates.push(`month = $${values.length + 1}`);
            values.push(data.month);
        }
        if (data.year !== undefined) {
            updates.push(`year = $${values.length + 1}`);
            values.push(data.year);
        }
        if (data.spent !== undefined) {
            updates.push(`spent = $${values.length + 1}`);
            values.push(data.spent);
        }
        if (updates.length === 0) {
            return BudgetRepository.findById(id, userId);
        }
        updates.push(`updated_at = NOW()`);
        values.push(id, userId);
        await postgres_1.default.query(`
        UPDATE budgets
        SET ${updates.join(", ")}
        WHERE id = $${values.length - 1} AND user_id = $${values.length}
      `, values);
        return BudgetRepository.findById(id, userId);
    },
    delete: async (id, userId) => {
        const { rowCount } = await postgres_1.default.query(`DELETE FROM budgets WHERE id = $1 AND user_id = $2`, [id, userId]);
        return (rowCount ?? 0) > 0;
    },
};
exports.default = BudgetRepository;
