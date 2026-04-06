import db from "@/lib/postgres";
import { CategoryEntity } from "./category.entities";

const CategoryRepository = {
  findById: async (id: string): Promise<CategoryEntity | null> => {
    const { rows } = await db.query(
      `SELECT id, user_id AS "userId", name, type 
       FROM categories WHERE id = $1`,
      [id],
    );
    return rows[0] || null;
  },

  findByUserId: async (userId: string): Promise<CategoryEntity[]> => {
    const { rows } = await db.query(
      `SELECT id, user_id AS "userId", name, type 
       FROM categories WHERE user_id = $1 ORDER BY name ASC`,
      [userId],
    );
    return rows;
  },

  findByUserIdAndName: async (
    userId: string,
    name: string,
  ): Promise<CategoryEntity | null> => {
    const { rows } = await db.query(
      `SELECT id, user_id AS "userId", name, type 
       FROM categories WHERE user_id = $1 AND LOWER(name) = LOWER($2)`,
      [userId, name],
    );
    return rows[0] || null;
  },

  insert: async (data: Partial<CategoryEntity>): Promise<CategoryEntity> => {
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

    const { rows } = await db.query(query, values);
    return rows[0];
  },

  update: async (
    id: string,
    data: Partial<CategoryEntity>,
  ): Promise<CategoryEntity | null> => {
    const updates: string[] = [];
    const values: any[] = [];

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

    const { rows } = await db.query(query, values);
    return rows[0] || null;
  },

  delete: async (id: string): Promise<boolean> => {
    const { rowCount } = await db.query(
      `DELETE FROM categories WHERE id = $1`,
      [id],
    );
    return (rowCount ?? 0) > 0;
  },
};

export default CategoryRepository;
