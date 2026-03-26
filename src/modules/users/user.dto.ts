export type createUserDTO = {
  username: string;
  email: string;
  password: string;
};

export type updateUserDTO = {
  username: string;
  email: string;
  password: string;
};

export type usersQueryDTO = {
  page?: number;
  limit?: number;
  search?: string;
};
