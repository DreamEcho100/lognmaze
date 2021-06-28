CREATE extension IF NOT EXISTS "uuid-ossp";

-- user Table
CREATE TABLE users (
  user_id uuid DEFAULT uuid_generate_v4(),
  user_name_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  email_verified BOOLEAN DEFAULT FALSE,
  show_email BOOLEAN DEFAULT FALSE,
  password TEXT NOT NULL,
  country_phone_code TEXT NOT NULL,
  phone_number TEXT UNIQUE,
  phone_verified BOOLEAN DEFAULT FALSE,
  show_phoneNumber BOOLEAN DEFAULT FALSE,
  role TEXT DEFAULT 'user',
  created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_sign_in date NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (user_id)
);

-- user_profile Table
CREATE TABLE user_profile (
  user_id uuid NOT NULL,

  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  date_of_birth DATE NOT NULL,
  show_date_of_birth BOOLEAN DEFAULT TRUE,

  country_of_birth TEXT NOT NULL,
  state_of_birth TEXT,
  city_of_birth TEXT,
  show_address_of_birth BOOLEAN DEFAULT FALSE,

  country_of_resident TEXT,
  state_of_resident TEXT,
  city_of_resident TEXT,
  address_of_resident TEXT,
  show_address_of_resident BOOLEAN DEFAULT FALSE,

  gender TEXT NOT NULL,
  profile_picture TEXT,
  cover_photo TEXT,

  bio TEXT,
  bioformat_type TEXT DEFAULT '',
  show_bio BOOLEAN DEFAULT TRUE,

  PRIMARY KEY (user_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

-- user_education Table
CREATE TABLE user_experience (
  user_id uuid NOT NULL,

  experience TEXT,
  show_experience BOOLEAN DEFAULT TRUE,

  education TEXT,
  show_education BOOLEAN DEFAULT TRUE,

  licenses_and_certifications TEXT,
  show_licenses_and_certifications BOOLEAN DEFAULT TRUE,

  skills_and_endorsements TEXT,
  show_skills_and_endorsements BOOLEAN DEFAULT TRUE,

  PRIMARY KEY (user_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);

-- news Table
CREATE TABLE news (
  news_id uuid DEFAULT uuid_generate_v4(),
  author_id uuid NOT NULL,

  type TEXT NOT NULL,

  created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_on date NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (news_id),
  FOREIGN KEY (author_id) REFERENCES users (user_id) ON DELETE CASCADE
);

-- tag Table
CREATE TABLE tag (
  tag_id uuid DEFAULT uuid_generate_v4(),
  news_id uuid NOT NULL,
  name TEXT,

  PRIMARY KEY (tag_id),
  FOREIGN KEY (news_id) REFERENCES news (news_id) ON DELETE CASCADE
  -- user_id uuid PRIMARY KEY REFERENCES users (user_id) ON DELETE CASCADE NOT NULL,
  -- parent_id uuid NOT NULL,
  -- parent_type TEXT NOT NULL,
);

-- post Table
CREATE TABLE post (
  post_id uuid NOT NULL,

  content TEXT NOT NULL,

  PRIMARY KEY (post_id),
  FOREIGN KEY (post_id) REFERENCES news (news_id) ON DELETE CASCADE
);

-- article Table
CREATE TABLE article (
  article_id uuid NOT NULL,

  format_type TEXT NOT NULL,

  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,

  content TEXT NOT NULL,

  PRIMARY KEY (article_id),
  FOREIGN KEY (article_id) REFERENCES news (news_id) ON DELETE CASCADE
);

-- news_vote Table
CREATE TABLE news_vote (
  news_vote_id uuid DEFAULT uuid_generate_v4(),
  news_id uuid NOT NULL,
  type TEXT NOT NULL,
  count INT DEFAULT 0,

  PRIMARY KEY (news_vote_id),
  FOREIGN KEY (news_id) REFERENCES news (news_id) ON DELETE CASCADE,

  CONSTRAINT news_vote_type CHECK (type='like' || type='dislike')
);

-- news_voter Table
CREATE TABLE news_voter (
  news_id uuid NOT NULL,
  user_id uuid NOT NULL,

  created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT news_voter_id PRIMARY KEY (news_id, user_id),

  FOREIGN KEY (news_id) REFERENCES news (news_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
);













































-- comment TABLE

CREATE TABLE comment (
  comment_id uuid DEFAULT uuid_generate_v4(),

  user_id uuid NOT NULL,
  news_id uuid NOT NULL,

  replies_count INT DEFAULT 0,

  content TEXT NOT NULL,

  created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_on date NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (comment_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
  FOREIGN KEY (news_id) REFERENCES news (news_id) ON DELETE CASCADE
);

-- comment TABLE

CREATE TABLE comment_reply (
  comment_reply_id uuid DEFAULT uuid_generate_v4(),

  user_id uuid NOT NULL,
  news_id uuid NOT NULL,

  ReplyTo uuid,

  content TEXT NOT NULL,

  created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_on date NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (comment_reply_id),
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE,
  FOREIGN KEY (news_id) REFERENCES news (news_id) ON DELETE CASCADE
);




























/*
DROP TABLE 
IF EXISTS
comment_reply,
comment,
news_voter,
news_vote,
article,
post,
tag,
news,
user_experience,
user_profile,
users
;
*/