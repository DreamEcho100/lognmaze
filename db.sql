CREATE DATABASE mazecode;

\c mazecode;

create extension if not exists "uuid-ossp";

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  user_name VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  gender VARCHAR(50) NOT NULL,
  role VARCHAR(50) NOT NULL,
  profile_picture VARCHAR(255),
  cover_photo VARCHAR(255),
  cv TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM users;

-- INSERT INTO users 
-- ( first_name, last_name, email, password, gender, role, profile_picture, cover_photo, cv)
--  VALUES 
-- ('Henry', 'Cavel', 'henryly321@gmail.com', 'kthl8822', 'male', 'user', '', '', '');


INSERT INTO users 
( first_name, last_name, user_name, email, password, gender, role)
 VALUES 
('Henry', 'Cavel', 'henry-cavel', 'henryly321@gmail.com', 'kthl8822', 'male', 'user');

SELECT * FROM users;

-- DELETE FROM users WHERE email='henryly321@gmail.com';

-- Expanded display is off. 
\x on;

SELECT * FROM users;

\x off;

-- DROP TABLE users;
