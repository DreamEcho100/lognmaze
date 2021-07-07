CREATE extension IF NOT EXISTS "uuid-ossp";

-- user Table
CREATE TABLE user_account (
  user_account_id uuid DEFAULT uuid_generate_v4(),
  user_name_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  email_verified BOOLEAN DEFAULT FALSE,
  show_email BOOLEAN DEFAULT FALSE,
  password TEXT NOT NULL,
  country_phone_code TEXT NOT NULL,
  phone_number TEXT,
  phone_verified BOOLEAN DEFAULT FALSE,
  show_phone_number BOOLEAN DEFAULT FALSE,
  role TEXT DEFAULT 'user',
  created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_sign_in date NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (user_account_id),
  CONSTRAINT user_phone_number UNIQUE (country_phone_code, phone_number)
);

-- user_profile Table
CREATE TABLE user_profile (
  user_profile_id uuid NOT NULL,

  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  show_date_of_birth BOOLEAN DEFAULT TRUE,

  gender TEXT NOT NULL,
  profile_picture TEXT,
  cover_photo TEXT,

  bio TEXT,
  bio_format_type TEXT,
  show_bio BOOLEAN DEFAULT TRUE,

  PRIMARY KEY (user_profile_id),
  FOREIGN KEY (user_profile_id) REFERENCES user_account (user_account_id) ON DELETE CASCADE
);

CREATE TABLE user_address (
  user_address_id uuid NOT NULL,

  country_of_birth TEXT,
  state_of_birth TEXT,
  city_of_birth TEXT,
  show_address_of_birth BOOLEAN DEFAULT FALSE,

  country_of_resident TEXT NOT NULL,
  state_of_resident TEXT NOT NULL,
  city_of_resident TEXT,
  address_of_resident TEXT,
  show_address_of_resident BOOLEAN DEFAULT FALSE,

  PRIMARY KEY (user_address_id),
  FOREIGN KEY (user_address_id) REFERENCES user_account (user_account_id) ON DELETE CASCADE
);

/*
-- user_activity Table
CREATE TABLE user_activity (
  user_activity_id uuid DEFAULT uuid_generate_v4(),
  user_account_id uuid NOT NULL,

  PRIMARY KEY (user_activity_id),
  FOREIGN KEY (user_account_id) REFERENCES user_account (user_account_id) ON DELETE CASCADE
);
*/

/*
-- user_education Table
CREATE TABLE user_experience (
  user_experience_id uuid NOT NULL,

  experience TEXT,
  show_experience BOOLEAN DEFAULT TRUE,

  education TEXT,
  show_education BOOLEAN DEFAULT TRUE,

  licenses_and_certifications TEXT,
  show_licenses_and_certifications BOOLEAN DEFAULT TRUE,

  skills_and_endorsements TEXT,
  show_skills_and_endorsements BOOLEAN DEFAULT TRUE,

  PRIMARY KEY (user_experience_id),
  FOREIGN KEY (user_experience_id) REFERENCES user_account (user_account_id) ON DELETE CASCADE
);
*/

-- news Table
CREATE TABLE news (
  news_id uuid DEFAULT uuid_generate_v4(),
  author_id uuid NOT NULL,

  type TEXT NOT NULL,

  content TEXT NOT NULL,

  -- comments_count INT DEFAULT 0,

  created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_on date NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (news_id),
  FOREIGN KEY (author_id) REFERENCES user_account (user_account_id) ON DELETE CASCADE
);

-- tag Table
CREATE TABLE tag (
  tag_id uuid DEFAULT uuid_generate_v4(),
  news_id uuid NOT NULL,
  name TEXT,

  PRIMARY KEY (tag_id),
  FOREIGN KEY (news_id) REFERENCES news (news_id) ON DELETE CASCADE
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

  CONSTRAINT news_vote_id PRIMARY KEY (news_vote_id),
  UNIQUE (news_id, type),
  FOREIGN KEY (news_id) REFERENCES news (news_id) ON DELETE CASCADE,

  CONSTRAINT news_vote_type CHECK (type='like' OR type='dislike')
);

-- news_voter Table
CREATE TABLE news_voter (
  news_id uuid NOT NULL,
  user_account_id uuid NOT NULL,

  news_vote_id uuid NOT NULL,

  created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT news_voter_id PRIMARY KEY (news_id, user_account_id),

  FOREIGN KEY (news_id) REFERENCES news (news_id),
  FOREIGN KEY (user_account_id) REFERENCES user_account (user_account_id) ON DELETE CASCADE,
  FOREIGN KEY (news_vote_id) REFERENCES news_vote (news_vote_id) ON DELETE CASCADE
);

/*-- news_comment TABLE
CREATE TABLE news_comment ();*/

-- news_comment TABLE
CREATE TABLE news_comment (
  news_comment_id uuid DEFAULT uuid_generate_v4(),

  user_account_id uuid NOT NULL,
  news_id uuid NOT NULL,

  replies_count INT DEFAULT 0,

  content TEXT NOT NULL,

  created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_on date NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (news_comment_id),
  FOREIGN KEY (user_account_id) REFERENCES user_account (user_account_id) ON DELETE CASCADE,
  FOREIGN KEY (news_id) REFERENCES news (news_id) ON DELETE CASCADE
);

-- news_comment TABLE
CREATE TABLE news_comment_reply (
  news_comment_reply_id uuid DEFAULT uuid_generate_v4(),

  user_account_id uuid NOT NULL,
  news_id uuid NOT NULL,

  reply_to_id uuid,

  content TEXT NOT NULL,

  created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_on date NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (news_comment_reply_id),
  FOREIGN KEY (user_account_id) REFERENCES user_account (user_account_id) ON DELETE CASCADE,
  FOREIGN KEY (news_id) REFERENCES news (news_id) ON DELETE CASCADE,
  FOREIGN KEY (reply_to_id) REFERENCES news_comment_reply (news_comment_reply_id)
);




























/*
DROP TABLE 
IF EXISTS
news_comment_reply,
news_comment,
news_voter,
news_vote,
article,
post,
tag,
news,
user_address,
user_experience,
user_profile,
user_activity,
user_account
;
*/
