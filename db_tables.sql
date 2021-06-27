CREATE extension IF NOT EXISTS "uuid-ossp";

-- user TABLE

CREATE TABLE users (
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  emailVerified BOOLEAN DEFAULT FALSE,
  show_email BOOLEAN DEFAULT FALSE,
  password TEXT NOT NULL,
  country_phone_code TEXT NOT NULL,
  phone_number TEXT UNIQUE,
  phone_verified BOOLEAN DEFAULT FALSE,
  show_phoneNumber BOOLEAN DEFAULT FALSE,
  role TEXT DEFAULT 'user',
  created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_sign_in date NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT check_email_min_length CHECK (LENGTH(email) >= 10 ),
  CONSTRAINT check_email_max_length CHECK (LENGTH(email) <= 150),
  CONSTRAINT check_password_min_length CHECK (LENGTH(password) >= 10 ),
  CONSTRAINT check_password_max_length CHECK (LENGTH(password) <= 150)

);

-- user_profile TABLE

CREATE TABLE user_profile (
  -- user_profile_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid PRIMARY KEY REFERENCES users (user_id) ON DELETE CASCADE NOT NULL,
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

  CONSTRAINT check_first_name_min_length CHECK (LENGTH(first_name) >= 3 ),
  CONSTRAINT check_last_name_min_length CHECK (LENGTH(last_name) >= 3 )
);

-- user_education TABLE

CREATE TABLE user_experience (
  -- user_experience_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid PRIMARY KEY REFERENCES users (user_id) ON DELETE CASCADE NOT NULL,

  experience TEXT,
  show_experience BOOLEAN DEFAULT TRUE,

  education TEXT,
  show_education BOOLEAN DEFAULT TRUE,

  licenses_and_certifications TEXT,
  show_licenses_and_certifications BOOLEAN DEFAULT TRUE,

  skills_and_endorsements TEXT,
  show_skills_and_endorsements BOOLEAN DEFAULT TRUE

);

-- tag TABLE

CREATE TABLE tag (
  tag_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid PRIMARY KEY REFERENCES users (user_id) ON DELETE CASCADE NOT NULL,
  parent_id uuid NOT NULL,
  parent_type TEXT NOT NULL,
  name TEXT
);

-- post TABLE

CREATE TABLE post (
  post_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users (user_id) ON DELETE CASCADE NOT NULL,

  content TEXT NOT NULL,

  created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_on date NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT check_content_min_length CHECK (LENGTH(content) > 2)
);

-- Article TABLE

CREATE TABLE article (
  article_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users (user_id) ON DELETE CASCADE NOT NULL,

  format_type TEXT NOT NULL,

  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  post_image TEXT NOT NULL,
  post_description TEXT NOT NULL,

  content TEXT NOT NULL,

  created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_on date NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT check_content_min_length CHECK (LENGTH(content) > 2)
);

-- post comment TABLE

CREATE TABLE comment (
  comment_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),

  user_id uuid REFERENCES users (user_id) ON DELETE CASCADE NOT NULL,
  parent_id uuid NOT NULL,
  parent_type TEXT NOT NULL,

  content TEXT NOT NULL,

  created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_on date NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT check_content_min_length CHECK (LENGTH(content) > 2)
);

-- post sub comment TABLE

CREATE TABLE comment_reply (
  comment_reply_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),

  user_id uuid REFERENCES users (user_id) ON DELETE CASCADE NOT NULL,
  parent_id uuid,
  ReplyTo uuid REFERENCES comment_reply (Id),

  content TEXT NOT NULL,

  created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_on date NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT check_content_min_length CHECK (LENGTH(content) > 2)
);

CREATE TABLE vote_properities (
  vote_properities_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  voted_for_id uuid NOT NULL,
  type TEXT NOT NULL,
  count INT DEFAULT 0
);

CREATE TABLE voter (
  -- voter_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  vote_properities_id uuid REFERENCES vote_properities (vote_properities_id) ON DELETE CASCADE NOT NULL,
  voted_for_id uuid REFERENCES vote_properities (voted_for_id) NOT NULL,
  user_id uuid REFERENCES users (user_id) NOT NULL,

  created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT voter_id PRIMARY KEY (vote_properities_id, voted_for_id, user_id)
);
