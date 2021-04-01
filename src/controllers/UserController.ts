import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Users } from '../models/Users';

class UserController {
  async createAccount(req: Request, res: Response) {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'No email or password provided' });
    }

    if (!firstName || !lastName) {
      return res.status(400).json({ error: 'You must provide your name' });
    }

    const usersRepository = getRepository(Users);

    const userAlreadyExists = await usersRepository.findOne({
      where: { email }
    });

    if (userAlreadyExists) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const user = usersRepository.create({
      email,
      password,
      firstName,
      lastName
    });
    await usersRepository.save(user);
    return res.json({ ...user, password: undefined });
  }

  async getUser(req: Request, res: Response) {
    // ToDo: destructure from req directly thx to middleware
    const { id } = req.body;
    const usersRepository = getRepository(Users);
    const user = await usersRepository.findOne(id);
    return res.json(user);
  }

  async deleteAccount(req: Request, res: Response) {
    // ToDo: destructure from req directly thx to middleware
    const { id } = req.body;
    const usersRepository = getRepository(Users);
    const deleteResponse = await usersRepository.delete(id);
    return res.json(deleteResponse);
  }
}

export const userController = new UserController();
