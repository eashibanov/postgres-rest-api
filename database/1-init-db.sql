CREATE USER postgres;
CREATE DATABASE phonebook;
GRANT ALL PRIVILEGES ON DATABASE docker TO phonebook;

\l

\c phonebook;

CREATE TABLE people (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    phone CHAR(14)
);

INSERT INTO users (name, phone)
    VALUES ('joe', '1-800-555-35-35'),
    ('ryan', '1-800-999-99-99');

select * from users;