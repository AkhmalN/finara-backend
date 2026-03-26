import jwt from 'jsonwebtoken';
import { ENV } from '../config/env';

export const signToken = (payload: any) => {
  return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, ENV.JWT_SECRET);
};
