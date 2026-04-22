"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgres_1 = __importDefault(require("@/lib/postgres"));
const CategoryRepository = {
    findById: async (id) => {
        const { rows } = await postgres_1.default.query(`SELECT id, user_id AS "userId", name, type 
       FROM categories WHERE id = $1`, [id]);
        return rows[0] || null;
    },
    findByUserId: async (userId) => {
        const { rows } = await postgres_1.default.query(`SELECT id, user_id AS "userId", name, type 
       FROM categories WHERE user_id = $1 ORDER BY name ASC`, [userId]);
        return rows;
    },
    findByUserIdAndName: async (userId, name) => {
        const { rows } = await postgres_1.default.query(`SELECT id, user_id AS "userId", name, type 
       FROM categories WHERE user_id = $1 AND LOWER(name) = LOWER($2)`, [userId, name]);
        return rows[0] || null;
    },
    insert: async (data) => {
        const query = `
    INSERT INTO categories (id, user_id, name, type)
    VALUES ($1, $2, $3, $4)
    RETURNING 
      id, 
      user_id AS "userId", 
      name, 
      type
  `;
        const values = [data.id, data.userId, data.name, data.type];
        const { rows } = await postgres_1.default.query(query, values);
        return rows[0];
    },
    update: async (id, data) => {
        const updates = [];
        const values = [];
        if (data.name !== undefined) {
            updates.push(`name = $${updates.length + 1}`);
            values.push(data.name);
        }
        if (data.type !== undefined) {
            updates.push(`type = $${updates.length + 1}`);
            values.push(data.type);
        }
        if (updates.length === 0) {
            return CategoryRepository.findById(id);
        }
        values.push(id);
        const query = `
    UPDATE categories
    SET ${updates.join(", ")}
    WHERE id = $${values.length}
    RETURNING 
      id, 
      user_id AS "userId", 
      name, 
      type
  `;
        const { rows } = await postgres_1.default.query(query, values);
        return rows[0] || null;
    },
    delete: async (id) => {
        const { rowCount } = await postgres_1.default.query(`DELETE FROM categories WHERE id = $1`, [id]);
        return (rowCount ?? 0) > 0;
    },
};
exports.default = CategoryRepository;
