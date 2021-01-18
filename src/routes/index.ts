import { NextFunction, Request, Response, Router } from 'express';
import { ApiController } from "../controllers/index.controller";
import Logger from 'bunyan'
import {HttpError} from "@curveball/http-errors";

let LOGGER: Logger;
const router = Router();

router.get('/test', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        let result = await ApiController.testConnection(req, res);
        res.json(result);
    } catch (err) {
        res.json({
            status: "Error",
            code: err.httpStatus,
            message: err.message
            })
        LOGGER.error({method: '/test', error: err});
        next(err);
    }
});

router.get('/users', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        let result = await ApiController.getUsers(req, res);
        res.json(result);
    } catch (err) {
        res.json({
            status: "Error",
            code: err.httpStatus,
            message: err.message
        })
        LOGGER.error({method: '/users', error: err});
        next(err);
    }
});

router.get('/users/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        let result = await ApiController.getUserById(req, res);
        res.json(result);
    } catch (err) {
        res.json({
            status: "Error",
            code: err.httpStatus,
            message: err.message
        })
        LOGGER.error({method: '/users/:id GET', error: err});
        next(err);
    }
});

router.post('/users', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        let result = await ApiController.createUser(req, res);
        res.json(result);
    } catch (err) {
        res.json({
            status: "Error",
            code: err.httpStatus,
            message: err.message
        })
        LOGGER.error({method: '/users POST', error: err});
        next(err);
    }
});

router.put('/users/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        let result = await ApiController.updateUser(req, res);
        res.json(result);
    } catch (err) {
        res.json({
            status: "Error",
            code: err.httpStatus,
            message: err.message
        })
        LOGGER.error({method: '/users/:id PUT', error: err});
        next(err);
    }
})

router.delete('/users/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        let result = await ApiController.deleteUser(req, res);
        res.json(result);
    } catch (err) {
        res.json({
            status: "Error",
            code: err.httpStatus,
            message: err.message
        })
        LOGGER.error({method: '/users/:id DELETE', error: err});
        next(err);
    }
});

module.exports = (logger: Logger): Router => {
    LOGGER = logger;
    return router;
};