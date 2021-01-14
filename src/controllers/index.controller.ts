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
    let data = await db.manyOrNone('SELECT * FROM people');
    res.send(data);
}

export const getUserById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    let data = await db.manyOrNone('SELECT * FROM people WHERE id = $1', [id]);
    res.send(data);
    //return res.json(response.rows);
};

export const createUser = async (req: Request, res: Response) => {
    const { name, phone } = req.body;
    await db.none('INSERT INTO people (name, phone) VALUES ($1, $2)', [name, phone]);
    res.send(`Insert successful ${name}`);
};

export const updateUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { name, phone } = req.body;

    await db.none('UPDATE people SET name = $1, phone = $2 WHERE id = $3', [
        name,
        phone,
        id
    ]);
    res.send('User Updated Successfully');
};

export const deleteUser = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    await db.result('DELETE FROM people where id = $1', [
        id
    ]);
    res.send(`User ${id} deleted Successfully`);
};

export const testConnection = async (req: Request, res: Response) => {
    res.send('ping\n');
}

