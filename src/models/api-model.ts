import {User} from "../types/User";
import {UserId} from "../types/UserId";
import * as Config from '../config/config.json';

const pgp = require('pg-promise')();

const db = pgp({
    host: process.env.HOST_URL || Config.host,
    port: process.env.PROXY_PORT || Config.dbPort,
    database: process.env.DB_NAME || Config.database,
    user: process.env.DB_USER || Config.user,
    password: process.env.DB_PASS || Config.password
})

export class ApiModel {
    static async getAllUsers(): Promise<User[]> {
        return db.manyOrNone('SELECT id, name, phone FROM people');
    }

    static async getUserById(param: UserId): Promise<User> {
        return db.one("SELECT name, phone FROM people WHERE id = $1", param.id);
    }

    static async createUser(param: User): Promise<UserId> {
        return db.one("INSERT INTO people (name, phone) VALUES ($1, $2) RETURNING id", [param.name, param.phone]);
    }

    static async updateUser(id: UserId, data: User): Promise<UserId> {
        return db.one('UPDATE people SET name = $1, phone = $2 WHERE id = $3 RETURNING id', [
            data.name,
            data.phone,
            id.id
        ]);
    }

    static async deleteUser(param: UserId): Promise<UserId> {
        return db.one('DELETE FROM people where id = $1 RETURNING id', [
            param.id
        ]);
    }
}