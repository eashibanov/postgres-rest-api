import { Request, Response } from 'express';
import { ApiModel } from '../models/api-model';
import { User } from '../types/User'
import { UserId } from '../types/UserId'
import { HttpErrorBase } from "@curveball/http-errors";
import Ajv, { JSONSchemaType } from "ajv";
import pgPromise from "pg-promise";
import QueryResultError = pgPromise.errors.QueryResultError;
import {queryErr} from "../errors/queryErr";

const ajv = new Ajv();
let httpErr = new HttpErrorBase();
httpErr.httpStatus = 500;

const schemaUser: JSONSchemaType<User> = {
    type: "object",
    properties: {
        name: { type: "string"},
        phone: { type: "string", maxLength: 15, minLength: 15 },
    },
    required: ["name", "phone"],
    additionalProperties: false,
}

const schemaId: JSONSchemaType<UserId> = {
    type: "object",
    properties: {
        id: { type: "number", minimum: 1 },
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
                httpErr.message = err.message;
            }
            else
                httpErr.message = 'Internal error';
            throw httpErr;
        }
    }

    static async getUserById(req: Request, res: Response): Promise<User> {
        try {
            const id = parseInt(req.params.id);
            if (!validateId( { id }))
                throw new QueryResultError();

            let data = await ApiModel.getUserById({id});
            return data;
        } catch (err) {
            if (err instanceof QueryResultError) {
                res.status(404);
                httpErr.httpStatus = 404;
                httpErr.message = 'ID is invalid';
            }
            else
                httpErr.message = 'Internal error';
            throw httpErr;
        }
    };

    static async createUser(req: Request, res: Response): Promise<UserId> {
        try {
            if (!validateUser(req.body))
                throw new queryErr();

            let data = await ApiModel.createUser(req.body)
            return data;
        } catch (err) {
            if (err instanceof queryErr) {
                res.status(400);
                httpErr.httpStatus = 400;
                httpErr.message = 'JSON body is invalid';
            }
            else
                httpErr.message = 'Internal error'
            throw httpErr;
        }
    };

    static async updateUser(req: Request, res: Response): Promise<UserId> {
        try {
            const id = parseInt(req.params.id);
            if (!validateId( { id }))
                throw new QueryResultError();

            if (!validateUser(req.body))
                throw new queryErr();

            let data = await ApiModel.updateUser({id}, req.body);
            return data;
        } catch (err) {
            if (err instanceof QueryResultError) {
                res.status(404);
                httpErr.httpStatus = 404;
                httpErr.message = 'ID is invalid';
            }
            if (err instanceof queryErr) {
                res.status(400);
                httpErr.httpStatus = 400;
                httpErr.message = 'JSON body is invalid';
            }
            else
                httpErr.message = 'Internal error';
            throw httpErr;
        }
    };

    static async deleteUser(req: Request, res: Response): Promise<UserId> {
        try {
            const id = parseInt(req.params.id);
            if (!validateId( { id }))
                throw new QueryResultError();

            let data = await ApiModel.deleteUser({id});
            return data;
        } catch (err) {
            if (err instanceof QueryResultError) {
                res.status(404);
                httpErr.httpStatus = 404;
                httpErr.message = 'ID is invalid';
            }
            else
                httpErr.message = 'Internal error';
            throw httpErr;
        }
    };

    static async testConnection(req: Request, res: Response) {
        return { message: 'ping' };
    }
}
