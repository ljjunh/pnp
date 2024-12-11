import { JWT } from 'next-auth/jwt';
import jwt from 'jsonwebtoken';

export const createAccessToken = (
  payload: { sub: string; email: string },
  secret: string,
): string => {
  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
};

export const createRefreshToken = (
  payload: { sub: string; email: string },
  secret: string,
): string => {
  return jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn: '30d',
  });
};

export const verifyToken = (token: string, secret: string): JWT => {
  return jwt.verify(token, secret) as JWT;
};
