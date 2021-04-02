import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401);
  }

  if (!authorization.startsWith('Bearer')) {
    return res.status(401).json({ error: 'Invalid Token' });
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, process.env.APPLICATION_SECRET_KEY);
    const { id } = data as TokenPayload;
    req.userId = id;
    return next();
  } catch (e) {
    console.log(e);
    return res.status(400).json({ error: 'Error during token validation' });
  }
}
