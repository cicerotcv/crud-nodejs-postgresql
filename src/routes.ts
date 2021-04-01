import { Router } from 'express';
import { authController } from './controllers/AuthController';
import { userController } from './controllers/UserController';
import { authMiddleware } from './middlewares/authMiddleware';

const router = Router();

// authentication
router.post('/users', userController.createAccount);
router.get('/users', authMiddleware, userController.getUser);
router.delete('/users', authMiddleware, userController.deleteAccount);
router.post('/auth', authController.authenticate);

export { router };
