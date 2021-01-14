import { Pool } from 'pg';

export const pool = new Pool({
    user: 'api',
    host: 'localhost',
    password: 'apipassword',
    database: 'people',
    port: 5432
});