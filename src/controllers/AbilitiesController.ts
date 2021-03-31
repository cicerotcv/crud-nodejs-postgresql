import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Abilities } from '../models/Abilities';

class AbilitiesController {
  async create(req: Request, res: Response) {
    const { name, value, label } = req.body;

    const abilitiesRepository = getRepository(Abilities);

    const ability = abilitiesRepository.create({
      name,
      value,
      label
    });

    await abilitiesRepository.save(ability);
    return res.json(ability);
  }

  async getAbility(req: Request, res: Response) {
    const { id } = req.params;
    const abilitiesRepository = getRepository(Abilities);

    const ability = await abilitiesRepository.findOne(id);
    return res.json(ability);
  }
}

export const abilitiesController = new AbilitiesController();
