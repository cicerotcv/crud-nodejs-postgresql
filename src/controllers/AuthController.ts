import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { Users } from '../models/Users';

class AuthController {
  async authenticate(req: Request, res: Response) {
    const repository = getRepository(Users);
    const { email, password } = req.body;

    const user = await repository.findOne({
      where: { email }
    });

    console.log(user);
    if (!user) {
      return res.sendStatus(401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.APPLICATION_SECRET_KEY!,
      { expiresIn: '1d' }
    );

    // delete user.password;
    return res.json({
      user,
      token
    });
  }
}

export const authController = new AuthController();
