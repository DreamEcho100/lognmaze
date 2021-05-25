CREATE DATABASE mazecode;

\c mazecode;

create extension if not exists "uuid-ossp";

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM users;

INSERT INTO users (first_name, last_name, email, password) VALUES ('Henry', 'Cavel', 'henryly321@gmail.com', 'kthl8822');

-- Expanded display is off. 
\x on;

SELECT * FROM users;

\x off;

-- DROP TABLE users;
