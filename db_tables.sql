CREATE extension IF NOT EXISTS "uuid-ossp";

-- Users TABLE

CREATE TABLE Users (
  Id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  UserNameId TEXT NOT NULL UNIQUE,
  Email TEXT NOT NULL UNIQUE,
  EmailVerified BOOLEAN DEFAULT FALSE,
  ShowEmail BOOLEAN DEFAULT FALSE,
  UserPassword TEXT NOT NULL,
  CountryPhoneCode TEXT NOT NULL,
  PhoneNumber TEXT UNIQUE,
  PhoneVerified BOOLEAN DEFAULT FALSE,
  ShowPhoneNumber BOOLEAN DEFAULT FALSE,
  UserRole TEXT DEFAULT 'user',
  CreatedAt date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  LastSignIn date NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT check_email_min_length CHECK (LENGTH(Email) >= 10 ),
  CONSTRAINT check_email_max_length CHECK (LENGTH(Email) <= 150),
  CONSTRAINT check_password_min_length CHECK (LENGTH(UserPassword) >= 10 ),
  CONSTRAINT check_password_max_length CHECK (LENGTH(UserPassword) <= 150)

);

-- UsersProfile TABLE

CREATE TABLE UsersProfile (
  Id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  UserId uuid REFERENCES Users (Id) ON DELETE CASCADE NOT NULL,
  FirstName VARCHAR(50) NOT NULL,
  LastName VARCHAR(50) NOT NULL,
  DateOfBirth DATE NOT NULL,
  ShowDateOfBirth BOOLEAN DEFAULT TRUE,

  CountryOfBirth TEXT NOT NULL,
  StateOfBirth TEXT,
  CityOfBirth TEXT,
  ShowAddressOfBirth BOOLEAN DEFAULT FALSE,

  CountryOfResident TEXT,
  StateOfResident TEXT,
  CityOfResident TEXT,
  AddressOfResident TEXT,
  ShowAddressOfResident BOOLEAN DEFAULT FALSE,

  Gender TEXT NOT NULL,
  ProfilePicture TEXT,
  CoverPhoto TEXT,

  CONSTRAINT check_first_name_min_length CHECK (LENGTH(FirstName) >= 3 ),
  CONSTRAINT check_last_name_min_length CHECK (LENGTH(LastName) >= 3 )
);

-- Users_education TABLE

CREATE TABLE UsersExperience (
  Id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  UserId uuid REFERENCES Users (Id) ON DELETE CASCADE NOT NULL,

  Bio TEXT,
  BioFormatType TEXT DEFAULT '',
  ShowBio BOOLEAN DEFAULT TRUE,

  Experience TEXT,
  ShowExperience BOOLEAN DEFAULT TRUE,

  Education TEXT,
  ShowEducation BOOLEAN DEFAULT TRUE,

  LicensesAndCertifications TEXT,
  ShowLicensesAndCertifications BOOLEAN DEFAULT TRUE,

  SkillsAndEndorsements TEXT,
  ShowSkillsAndEndorsements BOOLEAN DEFAULT TRUE

);

-- Posts TABLE

CREATE TABLE Posts (
  Id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  AuthorId uuid REFERENCES Users (Id) ON DELETE CASCADE NOT NULL,

  Content TEXT NOT NULL,

  -- postImages INT DEFAULT 0,
  -- postVideos INT DEFAULT 0,

  CreatedAt date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UpdatedOn date NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT check_content_min_length CHECK (LENGTH(Content) > 2)
);

-- Article TABLE

CREATE TABLE Articles (
  Id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  AuthorId uuid REFERENCES Users (Id) ON DELETE CASCADE NOT NULL,

  FormatType TEXT NOT NULL,

  Title TEXT NOT NULL,
  Slug TEXT UNIQUE NOT NULL,
  PostImage TEXT NOT NULL,
  PostDescription TEXT NOT NULL,

  Content TEXT NOT NULL,

  CreatedAt date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UpdatedOn date NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT check_content_min_length CHECK (LENGTH(Content) > 2)
);

-- ArticleTags TABLE

CREATE TABLE ArticleTags (
  Id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  ArticleId uuid REFERENCES Articles (Id) ON DELETE CASCADE NOT NULL,
  TagName TEXT
);

-- Posts comments TABLE

CREATE TABLE comments (

  Id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),

  UserId uuid REFERENCES Users (Id) ON DELETE CASCADE NOT NULL,
  parentId uuid NOT NULL, -- REFERENCES Posts (Id), -- ON DELETE CASCADE,
  ParentType TEXT NOT NULL,

  Content TEXT NOT NULL,

  CreatedAt date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UpdatedOn date NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT check_content_min_length CHECK (LENGTH(Content) > 2)
);

-- Posts sub comments TABLE

CREATE TABLE CommentReplies (
  Id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),

  UserId uuid REFERENCES Users (Id) ON DELETE CASCADE NOT NULL,
  parentId uuid REFERENCES PostComments (Id) ON DELETE CASCADE NOT NULL,
  ReplyTo uuid REFERENCES CommentReplies (Id),

  Content TEXT NOT NULL,

  CreatedAt date NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UpdatedOn date NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT check_content_min_length CHECK (LENGTH(Content) > 2)
);

-- Activity table

CREATE TABLE Activity (
  Id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),

  parentId uuid NOT NULL,
  parentType TEXT NOT NULL,

  ActivityType TEXT NOT NULL,
  ActivitySize INT DEFAULT 0
);


-- Likes table

CREATE TABLE Likes (
  Id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),

  UserId uuid REFERENCES Users (Id) NOT NULL, -- ON DELETE CASCADE,
  UserDeleted BOOLEAN DEFAULT FALSE,

  ParentId uuid NOT NULL, -- REFERENCES Users (Id) ON DELETE CASCADE
  ParentType TEXT NOT NULL,

  CreatedAt date NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Dislikes table

CREATE TABLE Dislikes (
  Id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),

  UserId uuid REFERENCES Users (Id) NOT NULL, -- ON DELETE CASCADE,
  UserDeleted BOOLEAN DEFAULT FALSE,
  
  ParentId uuid NOT NULL, -- REFERENCES Users (Id) ON DELETE CASCADE
  ParentType TEXT NOT NULL,

  CreatedAt date NOT NULL DEFAULT CURRENT_TIMESTAMP
);
