import { NextFunction, Request, Response } from 'express';

import { ItemsService } from '../services/index.js';

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await ItemsService.getAll();
    return res.json(items);
  } catch (error) {
    console.error(error);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const item = await ItemsService.getById(Number(id));
    return res.json(item);
  } catch (error) {
    console.error(error);
  }
};
