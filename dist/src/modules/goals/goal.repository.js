"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgresConfig_1 = require("@/lib/postgresConfig");
const postgres_1 = __importDefault(require("@/lib/postgres"));
const goalSelect = `
  SELECT
    fg.id,
    fg.user_id AS "userId",
    fg.name,
    fg.target_amount::text AS "targetAmount",
    fg.current_amount::text AS "currentAmount",
    fg.category,
    fg.priority,
    fg.status,
    fg.deadline,
    fg.created_at AS "createdAt",
    fg.updated_at AS "updatedAt",
    GREATEST(fg.target_amount - fg.current_amount, 0)::text AS "remainingAmount",
    CASE
      WHEN fg.target_amount > 0 THEN ROUND(((fg.current_amount / fg.target_amount) * 100)::numeric, 2)::float
      ELSE 0
    END AS "progressPercentage",
    COUNT(gc.id)::int AS "contributionCount",
    MAX(gc.date) AS "lastContributionDate"
  FROM financial_goals fg
  LEFT JOIN goal_contributions gc ON gc.goal_id = fg.id
`;
const goalGroupBy = `
  GROUP BY
    fg.id,
    fg.user_id,
    fg.name,
    fg.target_amount,
    fg.current_amount,
    fg.category,
    fg.priority,
    fg.status,
    fg.deadline,
    fg.created_at,
    fg.updated_at
`;
const GoalRepository = {
    findById: async (id, userId) => {
        const { rows } = await postgres_1.default.query(`${goalSelect} WHERE fg.id = $1 AND fg.user_id = $2 ${goalGroupBy}`, [id, userId]);
        return rows[0] ?? null;
    },
    findManyByUserId: async (userId, query) => {
        const conditions = ["fg.user_id = $1"];
        const values = [userId];
        if (query.status) {
            conditions.push(`fg.status = $${values.length + 1}`);
            values.push(query.status);
        }
        if (query.category) {
            conditions.push(`fg.category = $${values.length + 1}`);
            values.push(query.category);
        }
        if (query.priority) {
            conditions.push(`fg.priority = $${values.length + 1}`);
            values.push(query.priority);
        }
        const { rows } = await postgres_1.default.query(`${goalSelect} WHERE ${conditions.join(" AND ")} ${goalGroupBy} ORDER BY fg.created_at DESC`, values);
        return rows;
    },
    insert: async (userId, data) => {
        await postgres_1.default.query(`
        INSERT INTO financial_goals (
          id,
          user_id,
          name,
          target_amount,
          current_amount,
          category,
          priority,
          status,
          deadline,
          created_at,
          updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
      `, [
            data.id,
            userId,
            data.name,
            data.targetAmount,
            data.currentAmount ?? 0,
            data.category,
            data.priority ?? "medium",
            data.status,
            data.deadline ?? null,
        ]);
        const createdGoal = await GoalRepository.findById(data.id, userId);
        if (!createdGoal) {
            throw new Error("Failed to create goal");
        }
        return createdGoal;
    },
    update: async (id, userId, data) => {
        const updates = [];
        const values = [];
        if (data.name !== undefined) {
            updates.push(`name = $${values.length + 1}`);
            values.push(data.name);
        }
        if (data.targetAmount !== undefined) {
            updates.push(`target_amount = $${values.length + 1}`);
            values.push(data.targetAmount);
        }
        if (data.currentAmount !== undefined) {
            updates.push(`current_amount = $${values.length + 1}`);
            values.push(data.currentAmount);
        }
        if (data.category !== undefined) {
            updates.push(`category = $${values.length + 1}`);
            values.push(data.category);
        }
        if (data.priority !== undefined) {
            updates.push(`priority = $${values.length + 1}`);
            values.push(data.priority);
        }
        if (data.status !== undefined) {
            updates.push(`status = $${values.length + 1}`);
            values.push(data.status);
        }
        if (data.deadline !== undefined) {
            updates.push(`deadline = $${values.length + 1}`);
            values.push(data.deadline);
        }
        if (updates.length === 0) {
            return GoalRepository.findById(id, userId);
        }
        updates.push(`updated_at = NOW()`);
        values.push(id, userId);
        await postgres_1.default.query(`
        UPDATE financial_goals
        SET ${updates.join(", ")}
        WHERE id = $${values.length - 1} AND user_id = $${values.length}
      `, values);
        return GoalRepository.findById(id, userId);
    },
    delete: async (id, userId) => {
        const { rowCount } = await postgres_1.default.query(`DELETE FROM financial_goals WHERE id = $1 AND user_id = $2`, [id, userId]);
        return (rowCount ?? 0) > 0;
    },
    findContributionsByGoalId: async (goalId, userId) => {
        const { rows } = await postgres_1.default.query(`
        SELECT
          id,
          user_id AS "userId",
          goal_id AS "goalId",
          amount::text AS amount,
          date,
          source_transaction_id AS "sourceTransactionId",
          created_at AS "createdAt"
        FROM goal_contributions
        WHERE goal_id = $1 AND user_id = $2
        ORDER BY date DESC, created_at DESC
      `, [goalId, userId]);
        return rows;
    },
    addContribution: async (goalId, userId, data) => {
        const client = await postgresConfig_1.postgresConfig.pool.connect();
        try {
            await client.query("BEGIN");
            const contributionResult = await client.query(`
          INSERT INTO goal_contributions (
            id,
            user_id,
            goal_id,
            amount,
            date,
            source_transaction_id,
            created_at
          )
          VALUES ($1, $2, $3, $4, $5, $6, NOW())
          RETURNING
            id,
            user_id AS "userId",
            goal_id AS "goalId",
            amount::text AS amount,
            date,
            source_transaction_id AS "sourceTransactionId",
            created_at AS "createdAt"
        `, [
                crypto.randomUUID(),
                userId,
                goalId,
                data.amount,
                data.date,
                data.sourceTransactionId ?? null,
            ]);
            await client.query(`
          UPDATE financial_goals
          SET
            current_amount = current_amount + $1,
            status = CASE
              WHEN status = 'abandoned'::"GoalStatus" THEN status
              WHEN current_amount + $1 >= target_amount THEN 'completed'::"GoalStatus"
              ELSE status
            END,
            updated_at = NOW()
          WHERE id = $2 AND user_id = $3
        `, [data.amount, goalId, userId]);
            await client.query("COMMIT");
            const goal = await GoalRepository.findById(goalId, userId);
            if (!goal) {
                throw new Error("Failed to refresh goal after contribution");
            }
            return {
                goal,
                contribution: contributionResult.rows[0],
            };
        }
        catch (error) {
            await client.query("ROLLBACK");
            throw error;
        }
        finally {
            client.release();
        }
    },
};
exports.default = GoalRepository;
