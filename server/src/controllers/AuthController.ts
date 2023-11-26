import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { AuthService } from '../services/index.js';

import { ApiError } from '../exceptions/api-error.js';

export const registration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('Validation error', errors.array()));
    }

    const { name, email, password } = req.body;

    const userData = await AuthService.registration(name, email, password);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

    return res.json(userData);
  } catch (error) {
    next(error);
  }
};

export const verify = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const verificationLink = req.params.link;
    await AuthService.verify(verificationLink);
    // @ts-ignore
    return res.redirect(process.env.CLIENT_URL);
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const userData = await AuthService.login(email, password);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

    return res.json(userData);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies;

    const token = await AuthService.logout(refreshToken);
    res.clearCookie('refreshToken');

    return res.json(token);
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies;

    const userData = await AuthService.refresh(refreshToken);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });

    return res.json(userData);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await AuthService.getAllUsers();
    return res.json(users);
  } catch (error) {
    next(error);
  }
};
