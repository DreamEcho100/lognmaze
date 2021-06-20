-- CREATE DATABASE users;

-- CREATE TABLE users (
--   id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
--   first_name VARCHAR(32) NOT NULL,
--   last_name VARCHAR(32) NOT NULL,
--   user_name_id VARCHAR(100) NOT NULL UNIQUE,
--   email VARCHAR(100) NOT NULL UNIQUE,
--   email_verified BOOLEAN DEFAULT FALSE,
--   password VARCHAR(64) NOT NULL,
--   date_of_birth DATE NOT NULL,
--   country VARCHAR(64) DEFAULT '',
--   state VARCHAR(64) DEFAULT '',
--   city VARCHAR(64) DEFAULT '',
--   country_phone_code VARCHAR(10) NOT NULL,
--   phone_number TEXT NOT NULL UNIQUE,
--   phone_verified BOOLEAN DEFAULT FALSE,
--   gender VARCHAR(10) NOT NULL CONSTRAINT check_gender CHECK ( gender = 'male' OR gender = 'female' ),
--   role VARCHAR(25) DEFAULT 'user' CHECK ( role = 'user' OR role = 'admin' ), -- NOT NULL
--   profile_picture VARCHAR(255) DEFAULT '',
--   cover_photo VARCHAR(255) DEFAULT '',
--   about TEXT,
--   cv TEXT,
--   -- experience TEXT,
--   -- education TEXT,
--   -- `intro` TINYTEXT NULL DEFAULT NULL,
--   -- `profile` TEXT NULL DEFAULT NULL,
--   created_at date NOT NULL DEFAULT CURRENT_DATE,
--   last_sign_in DATE
-- );

DROP TABLE users;

DROP TABLE users_profile;

DROP TABLE users_experience;

create extension if not exists "uuid-ossp";

-- users TABLE

CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE CONSTRAINT check_email_min_length CHECK (LENGTH(email) >= 10 ) CONSTRAINT check_email_max_length CHECK (LENGTH(email) <= 150),
  email_verified BOOLEAN DEFAULT FALSE,
  show_email BOOLEAN DEFAULT FALSE,
  password TEXT NOT NULL CONSTRAINT check_password_min_length CHECK (LENGTH(password) >= 10 ) CONSTRAINT check_password_max_length CHECK (LENGTH(password) <= 150),
  country_phone_code TEXT NOT NULL,
  phone_number TEXT NOT NULL UNIQUE,
  phone_verified BOOLEAN DEFAULT FALSE,
  show_phone_number BOOLEAN DEFAULT FALSE,
  role TEXT DEFAULT 'user' CONSTRAINT check_role CHECK ( role = 'user' OR role = 'admin' ),
  created_at date NOT NULL DEFAULT CURRENT_DATE
);

-- users_profile TABLE

CREATE TABLE users_profile (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users (id) ON DELETE CASCADE NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  date_of_birth DATE NOT NULL,
  show_date_of_birth BOOLEAN DEFAULT TRUE,
  country TEXT NOT NULL,
  state TEXT,
  city TEXT,
  show_address BOOLEAN DEFAULT FALSE,
  gender TEXT NOT NULL,
  profile_picture TEXT,
  cover_photo TEXT,
  bio TEXT,
  bio_format_type TEXT DEFAULT 'txt',
  show_bio BOOLEAN DEFAULT TRUE,
  last_sign_in date NOT NULL DEFAULT CURRENT_DATE,

  CONSTRAINT check_first_name_min_length CHECK (LENGTH(first_name) >= 3 ),
  CONSTRAINT check_last_name_min_length CHECK (LENGTH(last_name) >= 3 ),
  CONSTRAINT check_gender CHECK ( gender = 'male' OR gender = 'female' ),
  CONSTRAINT check_bio_format_type CHECK ( bio_format_type = 'txt' OR bio_format_type = 'md' )
);

-- users_education TABLE

CREATE TABLE users_experience (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users (id) ON DELETE CASCADE NOT NULL,
  cv TEXT,
  cv_format_type TEXT DEFAULT 'txt',
  show_cv BOOLEAN DEFAULT TRUE,
  experience TEXT,
  education TEXT,
  licenses_and_certifications TEXT,
  skills_and_endorsements TEXT,

  CONSTRAINT check_cv_format_type CHECK ( cv_format_type = 'txt' OR cv_format_type = 'md' )
);

-- posts TABLE

CREATE TABLE posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id uuid REFERENCES users (id) ON DELETE CASCADE NOT NULL,
  format_type TEXT DEFAULT 'txt',
  title TEXT NOT NULL UNIQUE,
  meta_title TEXT,
  slug TEXT NOT NULL UNIQUE,
  image TEXT,
  meta_description TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  likes_users_id uuid[] DEFAULT ARRAY[]::uuid[],
  likes INT DEFAULT 0,
  created_at date NOT NULL DEFAULT CURRENT_DATE,
  updated_on date NOT NULL DEFAULT CURRENT_DATE,
  CONSTRAINT check_format_type CHECK ( format_type = 'txt' OR format_type = 'md' ),
  CONSTRAINT check_title_min_length CHECK (LENGTH(title) > 10),
  CONSTRAINT check_meta_title_min_length CHECK (LENGTH(meta_title) > 10),
  CONSTRAINT check_meta_description_length CHECK (LENGTH(meta_description) > 10),
  CONSTRAINT check_excerpt_length CHECK (LENGTH(excerpt) > 10),
  CONSTRAINT check_content_length CHECK (LENGTH(content) > 10)
);

-- tags TABLE

CREATE TABLE post_tags (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id uuid REFERENCES posts (id) ON DELETE CASCADE NOT NULL,
  name TEXT
);

-- comments TABLE

CREATE TABLE post_comments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users (id) NOT NULL,
  post_id uuid REFERENCES posts (id) ON DELETE CASCADE NOT NULL,
  type TEXT DEFAULT 'main_comment',
  reply_to uuid REFERENCES post_comments (id),
  header TEXT,
  body TEXT,
  created_at date NOT NULL DEFAULT CURRENT_DATE,
  updated_on date NOT NULL DEFAULT CURRENT_DATE
);


