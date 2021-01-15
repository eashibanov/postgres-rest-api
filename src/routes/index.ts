import { NextFunction, Request, Response, Router } from 'express';
import { ApiController } from "../controllers/index.controller";

const router = Router();

router.get('/test', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        let result = await ApiController.testConnection(req, res);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.get('/users', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        let result = await ApiController.getUsers(req, res);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.get('/users/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        let result = await ApiController.getUserById(req, res);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.post('/users', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        let result = await ApiController.createUser(req, res);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

router.put('/users/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        let result = await ApiController.updateUser(req, res);
        res.json(result);
    } catch (err) {
        next(err);
    }
})

router.delete('/users/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        let result = await ApiController.deleteUser(req, res);
        res.json(result);
    } catch (err) {
        next(err);
    }
});

export default router;