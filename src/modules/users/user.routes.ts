import { authMiddleware } from '@/middlewares/auth.middleware';
import { validateData } from '@/middlewares/validation.middleware';
import UserController from '@/modules/users/user.controller';
import { createUserSchema } from '@/modules/users/user.validators';
import { Router } from 'express';

const router = Router();

// router.use(authMiddleware);

router.get('/me', UserController.getUserMe);
router.get('/all', UserController.getUsers);
router.get('/:id', UserController.getUser);

router.post(
  '/create',
  validateData(createUserSchema),
  UserController.createUser,
);

router.put('/update/:id', UserController.updateUser);
router.delete('/delete/:id', UserController.deleteUser);

export default router;
