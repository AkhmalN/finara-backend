import db from "@/lib/postgres";
import { usersQueryDTO } from "@/modules/users/user.dto";
import UserEntity from "@/modules/users/user.model";

const UserRepository = {
  findById: async (id: string) => {
    // TODO: implement with PostgreSQL
    return null;
  },

  findMany: async (query: usersQueryDTO) => {
    // TODO: implement with PostgreSQL
    return {
      data: [],
      meta: {
        total: 0,
        page: query.page || 1,
        limit: query.limit || 10,
        totalPages: 0,
      },
    };
  },

  insert: async (data: UserEntity) => {
    const { rows } = await db.query(
      "INSERT INTO users (id, email, username, password_hash, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING id",
      [data.id, data.email, data.username, data.password_hash],
    );
    return rows[0] || null;
  },

  updateById: async (
    id: string,
    data: Pick<UserEntity, "username" | "email">,
  ) => {
    // TODO: implement with PostgreSQL
    return true;
  },

  deleteById: async (id: string) => {
    // TODO: implement with PostgreSQL
    return true;
  },
};

export default UserRepository;
