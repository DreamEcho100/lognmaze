CREATE DATABASE mazecode;

\c mazecode;

create extension if not exists "uuid-ossp";

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name VARCHAR(32) NOT NULL,
  last_name VARCHAR(32) NOT NULL,
  user_name_id VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  email_verified BOOLEAN,
  password VARCHAR(64) NOT NULL,
  date_of_birth DATE NOT NULL,
  country VARCHAR(64) DEFAULT '',
  state VARCHAR(64) DEFAULT '',
  city VARCHAR(64) DEFAULT '',
  country_phone_code VARCHAR(10) NOT NULL,
  phone_number TEXT NOT NULL UNIQUE,
  gender VARCHAR(10) NOT NULL CONSTRAINT check_gender CHECK ( gender = 'male' OR gender = 'female' ),
  role VARCHAR(25) DEFAULT 'user' CHECK ( role = 'user' OR role = 'admin' ), -- NOT NULL
  profile_picture VARCHAR(255) DEFAULT '',
  cover_photo VARCHAR(255) DEFAULT '',
  about TEXT,
  cv TEXT,
  -- experience TEXT,
  -- education TEXT,
  -- `intro` TINYTEXT NULL DEFAULT NULL,
  -- `profile` TEXT NULL DEFAULT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_sign_in DATE
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

-- posts TABLE

CREATE TABLE posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id uuid REFERENCES users (id),
  format_type VARCHAR(50) DEFAULT 'normal' CHECK ( format_type = 'normal' OR format_type = 'md' ),
  title VARCHAR(255) NOT NULL UNIQUE,
  -- meta_title VARCHAR(120),
  slug VARCHAR(255) NOT NULL UNIQUE,
  image VARCHAR(255) DEFAULT '',
  tags VARCHAR[] DEFAULT ARRAY[]::VARCHAR[],
  meta_description VARCHAR(255) NOT NULL,
  excerpt VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  like_user_id uuid[] DEFAULT ARRAY[]::uuid[],
  likes INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- comments TABLE

CREATE TABLE comments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  comment TEXT,
  author_id uuid REFERENCES users (id),
  post_id uuid REFERENCES posts (id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);



-- CREATE TABLE comments (
--   cid SERIAL PRIMARY KEY,
--   comment VARCHAR(255),
--   author VARCHAR REFERENCES users(username),
--   user_id INT REFERENCES users(uid),
--   post_id INT REFERENCES posts(pid),
--   date_created TIMESTAMP
-- );
