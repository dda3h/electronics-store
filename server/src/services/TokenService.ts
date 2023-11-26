import jwt from 'jsonwebtoken';

import { TokensDB } from '../database/index.js';

import { UserDto } from '../dtos/user-dto.js';

export const generateTokens = (payload: UserDto) => {
  // @ts-ignore
  const accessToken: string = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
  // @ts-ignore
  const refreshToken: string = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });

  return { accessToken, refreshToken };
};

export const validationAccessToken = (token: string) => {
  try {
    // @ts-ignore
    const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    return userData;
  } catch (error) {
    return null;
  }
};

export const validationRefreshToken = (token: string) => {
  try {
    // @ts-ignore
    const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return userData;
  } catch (error) {
    return null;
  }
};

export const saveToken = async (userId: number, refreshToken: string) => {
  const tokenData = await TokensDB.getTokenByUser(userId);

  if (tokenData) {
    return await TokensDB.updateToken(userId, refreshToken);
  }

  const token = await TokensDB.createToken(userId, refreshToken);

  return token;
};
