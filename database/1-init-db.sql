--CREATE USER postgres;
CREATE DATABASE phonebook;
--GRANT ALL PRIVILEGES ON DATABASE docker TO phonebook;

--\l

\c phonebook;

CREATE USER api WITH PASSWORD 'apipassword';

GRANT CONNECT ON DATABASE "phonebook" TO api;

GRANT ALL PRIVILEGES ON DATABASE "phonebook" TO api;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO api;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO api;

CREATE TABLE people (
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    phone CHAR(15)
);

INSERT INTO people (name, phone)
    VALUES ('joe', '1-800-555-35-35'),
    ('ryan', '1-800-999-99-99');

select * from people;