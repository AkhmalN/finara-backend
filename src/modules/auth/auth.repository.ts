import db from "@/lib/postgres";

const AuthRepository = {
  findByEmail: async (email: string) => {
    const { rows } = await db.query(
      "SELECT id, email FROM users WHERE email = $1",
      [email],
    );
    return rows[0] || null;
  },
  findPasswordByEmail: async (email: string) => {
    const { rows } = await db.query(
      "SELECT id, password_hash FROM users WHERE email = $1",
      [email],
    );
    return rows[0] || null;
  },
};

export default AuthRepository;
