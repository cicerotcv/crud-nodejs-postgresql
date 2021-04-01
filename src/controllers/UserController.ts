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
    return res.json({ ...user });
  }

  async getUser(req: Request, res: Response) {
    const { userId } = req;
    const usersRepository = getRepository(Users);
    const user = await usersRepository.findOne(userId);
    if (!user) {
      return res.status(404).json({ error: 'User does not exist' });
    }
    delete user.password;
    return res.json(user);
  }

  async updateUser(req: Request, res: Response) {
    const { userId } = req;
    const usersRepository = getRepository(Users);
    const user = await usersRepository.findOne(userId);
    // I believe there is another way. Maybe I shouldn't
    // make two queries in order to update a user;
    if (!user) {
      return res.status(404).json({ error: 'User does not exist' });
    }
    await usersRepository.update(userId, { ...req.body });
    return res.json({ ...user, ...req.body });
  }

  async deleteAccount(req: Request, res: Response) {
    const { userId } = req;
    const usersRepository = getRepository(Users);
    const deleteResponse = await usersRepository.delete(userId);
    return res.json(deleteResponse);
  }
}

export const userController = new UserController();
