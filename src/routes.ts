import { Router } from 'express';
import { abilitiesController } from './controllers/AbilitiesController';
import { userController } from './controllers/UsersController';

const router = Router();

// authentication
router.post('/u', userController.signup);

// abilities
router.post('/abilities', abilitiesController.create);
router.get('/abilities/:id', abilitiesController.getAbility);

export { router };
