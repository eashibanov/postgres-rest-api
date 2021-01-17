import { Request, Response } from 'express';
import { ApiModel } from '../models/api-model';
import { User } from '../types/User'
import { UserId } from '../types/UserId'
import {HttpErrorBase, isHttpError} from "@curveball/http-errors";

const httpErr = new HttpErrorBase('Internal server error!');
httpErr.httpStatus = 500;

export class ApiController {

    static async getUsers(req: Request, res: Response): Promise<User[]> {
        try {
            let data = await ApiModel.getAllUsers();
            return data;
        } catch (err) {
            httpErr.message = err.message;
            throw httpErr;
        }
    }

    static async getUserById(req: Request, res: Response): Promise<User> {
        try {
            const id = parseInt(req.params.id);
            let data = await ApiModel.getUserById({id})
            return data;
        } catch (err) {
            httpErr.message = err.message;
            throw httpErr;
        }
    };

    static async createUser(req: Request, res: Response): Promise<UserId> {
        try {
            let data = await ApiModel.createUser(req.body)
            return data;
        } catch (err) {
            httpErr.message = err.message;
            throw httpErr;
        }
    };

    static async updateUser(req: Request, res: Response): Promise<UserId> {
        try {
            const id = parseInt(req.params.id);
            let data = await ApiModel.updateUser({id}, req.body);
            return data;
        } catch (err) {
            httpErr.message = err.message;
            throw httpErr;
        }
    };

    static async deleteUser(req: Request, res: Response): Promise<UserId> {
        try {
            const id = parseInt(req.params.id);
            let data = await ApiModel.deleteUser({id});
            return data;
        } catch (err) {
            httpErr.message = err.message;
            throw httpErr;
        }
    };

    static async testConnection(req: Request, res: Response) {
        return {message:'ping'};
    }
}
