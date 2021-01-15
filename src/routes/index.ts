import { Request, Response, Router } from 'express';
import { ApiController } from "../controllers/index.controller";

const router = Router();

router.get('/test', ApiController.testConnection);
router.get('/users', ApiController.getUsers);
router.get('/users/:id', ApiController.getUserById);
router.post('/users', ApiController.createUser);
router.put('/users/:id', ApiController.updateUser)
router.delete('/users/:id', ApiController.deleteUser);

export default router;