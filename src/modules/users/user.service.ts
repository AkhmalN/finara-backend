import {
  createUserDTO,
  updateUserDTO,
  usersQueryDTO,
} from "@/modules/users/user.dto";
import UserEntity from "@/modules/users/user.model";
import UserRepository from "@/modules/users/user.repository";
import { hashPassword } from "@/utils/hash";

const UserService = {
  getUserById: async (id: string) => {
    const result = await UserRepository.findById(id);

    return result;
  },

  getAllUsers: async (query: usersQueryDTO) => {
    const result = await UserRepository.findMany(query);

    return {
      data: result.data,
      meta: result.meta,
    };
  },

  createUser: async (data: createUserDTO) => {
    const newUser: UserEntity = {
      username: data.username,
      email: data.email,
      password_hash: await hashPassword(data.password),
    };
    const result = await UserRepository.insert(newUser);

    return result;
  },

  updateUser: async (id: string, data: updateUserDTO) => {
    const updatedData: Pick<UserEntity, "username" | "email"> = {
      username: data.username,
      email: data.email,
    };

    const result = await UserRepository.updateById(id, updatedData);
    return result;
  },

  deleteUser: async (id: string) => {
    const result = await UserRepository.deleteById(id);
    return result;
  },
};

export default UserService;
