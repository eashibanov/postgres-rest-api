import { Pool } from 'pg';

export const pool = new Pool({
    user: 'api',
    host: 'localhost',
    password: '',
    database: 'phonebook',
    port: 55432
});
