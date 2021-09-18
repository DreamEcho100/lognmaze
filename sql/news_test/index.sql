-- news_test TABLE
CREATE TABLE news_test (
  news_test_id uuid NOT NULL,

  title TEXT NOT NULL, -- (Length > 3),

  description TEXT NOT NULL, -- (Length > 25),

  allowed for TEXT NOT NULL, -- IN (anyone || any user || groups),

  star rating BIGINT DEFAULT 0,

  date_of_start TIMESTAMP WITH TIME DEFAULT CURRENT_TIMESTAMP,

  -- duration BIGINT, -- 'numbers_in_seconds',

  date_of_end TIMESTAMP WITH TIME,

  content JSONB NOT NULL, -- DEFAULT '{}'::jsonb,

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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (group_id),

  FOREIGN KEY (created_by_id) REFERENCES user_account (user_account_id) ON DELETE SET NULL,
  FOREIGN KEY (owner_id) REFERENCES user_account (user_account_id) ON DELETE SET NULL,

  UNIQUE(owner_id, slug)
);

-- group_member TABLE
CREATE TABLE group_member (
  member_id uuid NOT NULL,
  group_id uuid NOT NULL,

  PRIMARY KEY (member_id, group_id),

  FOREIGN KEY (member_id) REFERENCES news_test (member_id) ON DELETE SET NULL,
  FOREIGN KEY (group_id) REFERENCES news_test_group (group_id) ON DELETE SET NULL
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

CREATE TABLE group_member_invitation (
  sender_id uuid,
  receiver_id uuid,
  group_id uuid,
  receiver_approved TEXT DEFAULT 'no answer',
  
  PRIMARY KEY (sender_id,  receiver_id,  group_id),
  FOREIGN KEY (sender_id) REFERENCES user_account (user_account_id) ON DELETE SET NULL,
  FOREIGN KEY (receiver_id) REFERENCES user_account (user_account_id) ON DELETE SET NULL,
  FOREIGN KEY (group_id) REFERENCES group (group_id) ON DELETE SET NULL
);
