CREATE extension IF NOT EXISTS "uuid-ossp";

-- user_account Table
CREATE TABLE user_account (
  user_account_id uuid DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'user', 
  user_prefrences JSONB,

  PRIMARY KEY (user_account_id),

  UNIQUE(email)
);

-- user_profile Table
CREATE TABLE user_profile (
  user_profile_id uuid NOT NULL,
  user_name_id TEXT NOT NULL,

  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,

  gender TEXT NOT NULL,
  profile_picture TEXT,
  cover_photo TEXT,

  bio TEXT,

  news_post_counter BIGINT DEFAULT 0,
  news_article_counter BIGINT DEFAULT 0,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  last_sign_in TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (user_profile_id),

  FOREIGN KEY (user_profile_id) REFERENCES user_account (user_account_id) ON DELETE CASCADE,

  UNIQUE(user_name_id),

  CONSTRAINT check_news_post_counter_min CHECK (news_post_counter >= 0),
  CONSTRAINT check_news_article_counter_min CHECK (news_article_counter >= 0)
);

-- ALTER TABLE user_profile
-- ADD COLUMN news_post_counter BIGINT DEFAULT 0;

-- ALTER TABLE user_profile
-- ADD COLUMN news_article_counter BIGINT DEFAULT 0;

-- ALTER TABLE user_profile 
-- ADD CONSTRAINT check_news_post_counter_min 
-- CHECK (
-- 	news_post_counter >= 0
-- );

-- ALTER TABLE user_profile 
-- ADD CONSTRAINT check_news_article_counter_min 
-- CHECK (
-- 	news_article_counter >= 0
-- );

CREATE TABLE user_address (
  user_address_id uuid NOT NULL,

  country_of_birth TEXT,
  state_of_birth TEXT,
  city_of_birth TEXT,

  country_of_resident TEXT NOT NULL,
  state_of_resident TEXT NOT NULL,
  city_of_resident TEXT,
  address_of_resident TEXT,

  PRIMARY KEY (user_address_id),
  FOREIGN KEY (user_address_id) REFERENCES user_account (user_account_id) ON DELETE CASCADE
);

-- CREATE TABLE user_activity ();
-- CREATE TABLE user_experience ();

-- news Table
CREATE TABLE news (
  news_id uuid DEFAULT uuid_generate_v4(),
  author_id uuid NOT NULL,

  type TEXT NOT NULL,

  comments_counter BIGINT DEFAULT 0,

  up_votes_counter BIGINT DEFAULT 0,
  down_votes_counter BIGINT DEFAULT 0,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (news_id),
  FOREIGN KEY (author_id) REFERENCES user_account (user_account_id) ON DELETE CASCADE,

  CONSTRAINT check_comments_counter_min CHECK (comments_counter >= 0),
  CONSTRAINT check_up_votes_counter_min CHECK (up_votes_counter >= 0),
  CONSTRAINT check_down_votes_counter_min CHECK (down_votes_counter >= 0)
);

-- tag Table
CREATE TABLE tag (
  name TEXT NOT NULL,
  counter BIGINT DEFAULT 1,

  PRIMARY KEY (name),
  CONSTRAINT check_counter_min CHECK (counter >= 0)
);

-- tag Table
CREATE TABLE news_tag (
  news_tag_id uuid DEFAULT uuid_generate_v4(),
  news_id uuid NOT NULL,
  name TEXT NOT NULL,

  PRIMARY KEY (news_tag_id),
  FOREIGN KEY (news_id) REFERENCES news (news_id) ON DELETE CASCADE,
  FOREIGN KEY (name) REFERENCES tag (name) ON DELETE CASCADE
);

-- -- tag Table
-- CREATE TABLE news_tag (
--   news_tag_id uuid DEFAULT uuid_generate_v4(),
--   news_id uuid NOT NULL,
--   name TEXT NOT NULL,

--   PRIMARY KEY (news_tag_id),
--   FOREIGN KEY (news_id) REFERENCES news (news_id) ON DELETE CASCADE
-- );

-- post Table
CREATE TABLE news_post (
  news_post_id uuid NOT NULL,

  content TEXT NOT NULL,

  PRIMARY KEY (news_post_id),
  FOREIGN KEY (news_post_id) REFERENCES news (news_id) ON DELETE CASCADE
);

-- article Table
CREATE TABLE news_article (
  news_article_id uuid NOT NULL,

  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  iso_language TEXT NOT NULL,
  iso_country TEXT NOT NULL,
  image_alt TEXT NOT NULL,
  image_src TEXT NOT NULL,
  description TEXT NOT NULL,

  content TEXT NOT NULL,

  PRIMARY KEY (news_article_id),

  FOREIGN KEY (news_article_id) REFERENCES news (news_id) ON DELETE CASCADE,

  UNIQUE(slug)
);

-- news_vote Table

CREATE TABLE news_vote (
  news_id uuid NOT NULL,
  voter_id uuid NOT NULL,

  vote_type TEXT NOT NULL,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (news_id, voter_id),

  FOREIGN KEY (news_id) REFERENCES news (news_id) ON DELETE CASCADE,
  FOREIGN KEY (voter_id) REFERENCES user_account (user_account_id) ON DELETE CASCADE,

  CONSTRAINT news_vote_check_vote_type CHECK (vote_type = 'up' OR vote_type = 'down')
);

-- news_comment Table
CREATE TABLE news_comment (
  news_comment_id uuid DEFAULT uuid_generate_v4(),
  news_id uuid NOT NULL,
  author_id uuid NOT NULL,

  type TEXT NOT NULL,
  content TEXT NOT NULL,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (news_comment_id),
  FOREIGN KEY (news_id) REFERENCES news (news_id) ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES user_account (user_account_id) ON DELETE CASCADE
);

-- news_comment_main TABLE
CREATE TABLE news_comment_main (
  news_comment_main_id uuid NOT NULL,

  replies_counter INT DEFAULT 0,

  PRIMARY KEY (news_comment_main_id),

  FOREIGN KEY (news_comment_main_id) REFERENCES news_comment (news_comment_id) ON DELETE CASCADE,

  CONSTRAINT check_replies_counter_min CHECK (replies_counter >= 0)
);

-- news_comment_main_reply TABLE
CREATE TABLE news_comment_main_reply (
  news_comment_main_reply_id uuid NOT NULL,

  parent_id uuid NOT NULL,
  reply_to_comment_id uuid, --  NOT NULL,
  reply_to_user_id uuid, -- NOT NULL

  PRIMARY KEY (news_comment_main_reply_id),

  FOREIGN KEY (news_comment_main_reply_id) REFERENCES news_comment (news_comment_id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES news_comment_main (news_comment_main_id) ON DELETE CASCADE,
  FOREIGN KEY (reply_to_comment_id) REFERENCES news_comment (news_comment_id) ON DELETE SET NULL,
  FOREIGN KEY (reply_to_user_id) REFERENCES user_account (user_account_id) ON DELETE SET NULL
);

-- news_test TABLE
CREATE TABLE news_test (
  news_test_id uuid NOT NULL,

  title TEXT NOT NULL, -- (Length > 3),

  description TEXT NOT NULL, -- (Length > 25),

  allowed for TEXT NOT NULL, -- IN (anyone || any user || groups),

  star rating BIGINT DEFAULT 0,

  date_of_start TIMESTAMP WITH TIME,

  duration BIGINT, -- 'numbers_in_seconds',

  date_of_end TIMESTAMP WITH TIME,

  content JSONB DEFAULT '{}'::jsonb,

  PRIMARY KEY (news_test_id),
  FOREIGN KEY (news_test_id) REFERENCES news (news_id) ON DELETE CASCADE
);

-- group TABLE
CREATE TABLE group (
  group_id uuid DEFAULT uuid_generate_v4(),
  created_by_id uuid NOT NULL,
  owner_id uuid NOT NULL,

  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL, -- public/private

  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (group_id),

  FOREIGN KEY (created_by_id) REFERENCES user_account (user_account_id) ON DELETE SET NULL,
  FOREIGN KEY (owner_id) REFERENCES user_account (user_account_id) ON DELETE SET NULL,

  UNIQUE(owner_id, slug)
);

-- news_test_group TABLE
CREATE TABLE news_test_group (
  -- news_test_group_id uuid DEFAULT uuid_generate_v4(),
  news_test_id uuid NOT NULL,
  group_id uuid NOT NULL,

  PRIMARY KEY (news_test_id, group_id),

  FOREIGN KEY (news_test_id) REFERENCES news_test (news_test_id) ON DELETE SET NULL,
  FOREIGN KEY (group_id) REFERENCES group (group_id) ON DELETE SET NULL
);

-- news_test_group_member TABLE
CREATE TABLE news_test_group_member (
  member_id uuid NOT NULL,
  group_id uuid NOT NULL,

  PRIMARY KEY (member_id, group_id),

  FOREIGN KEY (member_id) REFERENCES news_test (member_id) ON DELETE SET NULL,
  FOREIGN KEY (group_id) REFERENCES news_test_group (group_id) ON DELETE SET NULL
);





















/*
DROP TABLE 
IF EXISTS
news_comment_main_reply,
news_comment_main,
news_comment,
news_vote,
news_article,
news_post,
news_tag,
tag,
news,
user_experience,
user_activity,
user_address,
user_profile,
user_account
;
*/
