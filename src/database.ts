import { Pool } from 'pg';

export const pool = new Pool({
    user: 'api',
    host: '127.0.0.1',
    password: 'apipassword',
    database: 'people',
    port: 55432
});
