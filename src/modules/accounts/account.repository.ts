import db from "@/lib/postgres";

type AccountRow = {
  id: string;
  user_id: string;
  name: string;
  balance: string;
  currency: string;
  created_at: Date;
  updated_at: Date;
};

const AccountRepository = {
  findByUserId: async (userId: string): Promise<AccountRow | null> => {
    const { rows } = await db.query(
      `SELECT id, user_id, name, balance, currency, created_at, updated_at
       FROM accounts
       WHERE user_id = $1
       ORDER BY created_at ASC
       LIMIT 1`,
      [userId],
    );

    return rows[0] ?? null;
  },
};

export default AccountRepository;
