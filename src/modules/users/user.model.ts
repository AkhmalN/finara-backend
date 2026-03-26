interface UserEntity {
  id?: string;
  email: string;
  username: string;
  password_hash: string;
  created_at?: Date;
  updated_at?: Date;
}

export default UserEntity;
