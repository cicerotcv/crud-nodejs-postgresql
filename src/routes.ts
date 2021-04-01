import { Router } from 'express';
import { userController } from './controllers/UserController';

const router = Router();

// authentication
router.post('/u', userController.createAccount);
router.get('/u', userController.getUser);
router.delete('/u', userController.deleteAccount);

export { router };
