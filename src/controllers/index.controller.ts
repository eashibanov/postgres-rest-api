import { Request, Response } from 'express';
import { pool } from '../database';
import { QueryResult } from 'pg';
import {as} from "pg-promise";

const pgp = require('pg-promise')();

const db = pgp({
    host: 'localhost',
    port: '55432',
    database: 'phonebook',
    user: 'api',
    password: 'apipassword'
})

export const getUsers = async (req: Request, res: Response) => {
    let data = db.manyOrNone('SELECT * FROM people');
    res.send(data);
}

export const testConnection = async (req: Request, res: Response) => {
    res.send('ping\n');
}

/*
export const getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
        const response: QueryResult = await
            pool.query('SELECT * FROM people ORDER BY id ASC');
        res.send('hey');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error');
    }
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    const id = parseInt(req.params.id);
    const response: QueryResult = await pool.query('SELECT * FROM people WHERE id = $1', [id]);
    return res.json(response.rows);
};

export const createUser = async (req: Request, res: Response) => {
    const { name, phone } = req.body;
    const response = await pool.query('INSERT INTO people (name, phone) VALUES ($1, $2)', [name, phone]);
    res.json({
        message: 'User Added successfully',
        body: {
            user: { name, phone }
        }
    })
};

export const updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name, phone } = req.body;

    const response = await pool.query('UPDATE people SET name = $1, phone = $2 WHERE id = $3', [
        name,
        phone,
        id
    ]);
    res.json('User Updated Successfully');
};

export const deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await pool.query('DELETE FROM people where id = $1', [
        id
    ]);
    res.json(`User ${id} deleted Successfully`);
};
*/
