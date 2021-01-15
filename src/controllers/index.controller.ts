import { Request, Response } from 'express';
import { ApiModel } from '../models/api-model';
import { User } from '../types/User'
import { UserId } from '../types/UserId'

export class ApiController {

    static async getUsers(req: Request, res: Response): Promise<User[]> {
        try {
            let data = await ApiModel.getAllUsers();
            res.send(data);
            return data;
        } catch (err) {
            res.send('Server error!');
            return [];
        }
    }

    static async getUserById(req: Request, res: Response): Promise<User> {
        try {
            const id = parseInt(req.params.id);
            let data = await ApiModel.getUserById({id})
            res.send(`User id:${id}: name: ${data.name}, phone: ${data.phone}`);
            return data;
        } catch (err) {
            res.send('Server error!');
            return {name: "", phone: ""};
        }
    };

    static async createUser(req: Request, res: Response): Promise<UserId> {
        try {
            let data = await ApiModel.createUser(req.body)
            res.send(`Insert successful, ${data.id} inserted`);
            return data;
        } catch (err) {
            res.send('Server error!');
            return {id: -1};
        }
    };

    static async updateUser(req: Request, res: Response): Promise<UserId> {
        try {
            const id = parseInt(req.params.id);
            let data = await ApiModel.updateUser({id}, req.body);
            res.send(`User ${data.id} Updated Successfully:\n`);
            return data;
        } catch (err) {
            res.send('Server error!');
            return {id: -1}
        }
    };

    static async deleteUser(req: Request, res: Response): Promise<UserId> {
        try {
            const id = parseInt(req.params.id);
            let data = await ApiModel.deleteUser({id});
            res.send(`User ${id} deleted Successfully`);
            return data;
        } catch (err) {
            res.send('Server error!');
            return {id: -1}
        }
    };

    static async testConnection(req: Request, res: Response) {
        res.send('ping\n');
        return 'ping';
    }
}
