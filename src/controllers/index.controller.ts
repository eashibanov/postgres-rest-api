import { Request, Response } from 'express';
import { ApiModel } from '../models/api-model';
import { User } from '../types/User'
import { UserId } from '../types/UserId'
import { HttpErrorBase } from "@curveball/http-errors";
import Ajv, { JSONSchemaType } from "ajv";
import pgPromise from "pg-promise";
import QueryResultError = pgPromise.errors.QueryResultError;

const ajv = new Ajv();
let httpErr = new HttpErrorBase();

const schemaUser: JSONSchemaType<User> = {
    type: "object",
    properties: {
        "name": { type: "string"},
        "phone": { type: "string", maxLength: 15, minLength: 15 }
    },
    required: ["name"],
    additionalProperties: false,
}

const schemaId: JSONSchemaType<UserId> = {
    type: "object",
    properties: {
        "id": { type: "number", minimum: 1 }
    },
    required: ["id"],
    additionalProperties: false,
}

const validateUser = ajv.compile(schemaUser);
const validateId = ajv.compile(schemaId);

export class ApiController {

    static async getUsers(req: Request, res: Response): Promise<User[]> {
        try {
            let data = await ApiModel.getAllUsers();
            return data;
        } catch (err) {
            if (err instanceof QueryResultError) {
                res.status(404);
                httpErr.httpStatus = 404;
                httpErr.title = 'Invalid query'
            }
            httpErr.message = err.message;
            throw httpErr;
        }
    }

    static async getUserById(req: Request, res: Response): Promise<User> {
        try {
            const id = parseInt(req.params.id);
            if (!validateId( { id }))
                throw new QueryResultError('ID is invalid');

            let data = await ApiModel.getUserById({id});
            return data;
        } catch (err) {
            if (err instanceof QueryResultError) {
                res.status(404);
                httpErr.httpStatus = 404;
                httpErr.title = 'Invalid query params'
            }
            httpErr.message = err.type;
            throw httpErr;
        }
    };

    static async createUser(req: Request, res: Response): Promise<UserId> {
        try {
            if (!validateUser(req.body))
                throw new QueryResultError('JSON is invalid');

            let data = await ApiModel.createUser(req.body)
            return data;
        } catch (err) {
            if (err instanceof QueryResultError) {
                res.status(400);
                httpErr.httpStatus = 400;
                httpErr.title = 'Invalid query'
            }
            httpErr.message = err.message;
            throw httpErr;
        }
    };

    static async updateUser(req: Request, res: Response): Promise<UserId> {
        try {
            const id = parseInt(req.params.id);
            if (!validateId( { id }))
                throw new QueryResultError('ID is invalid');

            let data = await ApiModel.updateUser({id}, req.body);
            return data;
        } catch (err) {
            if (err instanceof QueryResultError) {
                res.status(400);
                httpErr.httpStatus = 400;
                httpErr.title = 'Invalid query'
            }
            httpErr.message = err.message;
            throw httpErr;
        }
    };

    static async deleteUser(req: Request, res: Response): Promise<UserId> {
        try {
            const id = parseInt(req.params.id);
            if (!validateId( { id }))
                throw new QueryResultError('ID is invalid');

            let data = await ApiModel.deleteUser({id});
            return data;
        } catch (err) {
            if (err instanceof QueryResultError) {
                res.status(404);
                httpErr.httpStatus = 404;
                httpErr.title = 'Invalid query'
            }
            httpErr.message = err.message;
            throw httpErr;
        }
    };

    static async testConnection(req: Request, res: Response) {
        return { message: 'ping' };
    }
}
