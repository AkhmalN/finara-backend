import AuthRepository from "@/modules/auth/auth.repository";
import UserRepository from "@/modules/users/user.repository";
import { createUserDTO } from "@/modules/users/user.dto";
import { comparePassword, hashPassword } from "@/utils/hash";
import { signToken } from "@/utils/jwt";

const AuthService = {
  registerUser: async (user: createUserDTO) => {
    const existingUser = await AuthRepository.findByEmail(user.email);

    if (existingUser) {
      throw new Error("Email already in use");
    }

    const passwordHash = await hashPassword(user.password);

    const newUser = await UserRepository.insert({
      id: crypto.randomUUID(),
      email: user.email,
      username: user.username,
      password_hash: passwordHash,
    });

    return newUser;
  },
  loginUser: async (email: string, password: string) => {
    const user = await AuthRepository.findPasswordByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await comparePassword(password, user.password_hash);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = signToken({ userId: user.id, email: user.email });

    return {
      access_token: token,
      user: {
        id: user.id,
      },
    };
  },
};

export default AuthService;
