SELECT
  news.news_id,
  news.author_id,
  news.type,
  news.content,
  news.comments_count,
  news.created_at,
  news.updated_on,

  user_profile.user_profile_id AS author_user_name_id,
  user_profile.first_name,
  user_profile.last_name,
  user_profile.profile_picture

FROM user_profile
JOIN news ON news.author_id = user_profile.user_profile_id
ORDER BY news.created_at DESC;

SELECT
  post.content
from post WHERE post_id IN ("ed37d98c-ad99-4281-9652-cb31a67c0454");

SELECT
  news_tags.tags,
  
  news_article.format_type,
  news_article.title,
  news_article.slug,
  news_article.image,
  news_article.description,
  news_article.content

FROM news_article
JOIN LATERAL(
  SELECT ARRAY (
    -- SELECT array_agg(post_tags.name) AS tags
    SELECT news_tag.name AS tag
    FROM news_tag
    -- JOIN posts
    -- ON news_tag.post_id = posts.id
    WHERE news_tag.news_id = news_article.news_article_id
  ) AS tags
) news_tags ON TRUE
WHERE news_article.news_article_id IN ('c74ac384-aa3b-46e6-91b2-b847310ce535', 'bf54c8c7-473b-4323-bebf-aeb808e1ca5f');
;

WITH get_posts AS (
  SELECT
    news_post.content
  from news_post WHERE news_post_id IN ('ed37d98c-ad99-4281-9652-cb31a67c0454')
),
get_articles AS (
  SELECT
    news_tags.tags,
    
    news_article.format_type,
    news_article.title,
    news_article.slug,
    news_article.image,
    news_article.description,
    news_article.content

  FROM news_article
  JOIN LATERAL(
    SELECT ARRAY (
      -- SELECT array_agg(post_tags.name) AS tags
      SELECT news_tag.name AS tag
      FROM news_tag
      -- JOIN posts
      -- ON news_tag.post_id = posts.id
      WHERE news_tag.news_id = news_article.news_article_id
    ) AS tags
  ) news_tags ON TRUE
  WHERE news_article.news_article_id IN ('c74ac384-aa3b-46e6-91b2-b847310ce535', 'bf54c8c7-473b-4323-bebf-aeb808e1ca5f')
)

SELECT * FROM get_posts, get_articles;


INSERT INTO news
  (
    author_id,
    type
  )
VALUES
  ($1, $2)
RETURNING news_id;


SELECT
  news_post.content
FROM news_post
WHERE news_post_id IN ('ed37d98c-ad99-4281-9652-cb31a67c0454');

SELECT
  news_post.content
FROM news_post
Join news_post
ON news.news_id = news_post.news_post_id;

SELECT
  news_tags.tags,
  
  news_article.format_type,
  news_article.title,
  news_article.slug,
  news_article.image,
  news_article.description,
  news_article.content,

  news.type,
  news.comments_count,
  news.created_at,
  news.updated_on

FROM news
Join news_article
ON news.news_id = news_article.news_article_id
JOIN LATERAL(
  SELECT ARRAY (
    -- SELECT array_agg(post_tags.name) AS tags
    SELECT news_tag.name AS tag
    FROM news_tag
    -- JOIN posts
    -- ON news_tag.post_id = posts.id
    WHERE news_tag.news_id = news.news_id
  ) AS tags
) news_tags ON TRUE
;

SELECT

  news.news_id,
  news.type,
  news.comments_count,
  news.created_at,
  news.updated_on,
  
  news_tags.tags,

  news_article.format_type,
  news_article.title,
  news_article.slug,
  news_article.image,
  news_article.description,
  news_article.content,


  user_profile.user_profile_id AS author_id,
  user_profile.user_name_id AS author_name_id,
  user_profile.first_name AS author_first_name,
  user_profile.last_name AS author_last_name,
  user_profile.profile_picture AS author_profile_picture

FROM news
JOIN user_profile ON user_profile.user_profile_id = news.author_id
JOIN news_article ON news_article.news_article_id = news.news_id
JOIN LATERAL(
  SELECT ARRAY (
    SELECT news_tag.name AS tag
    FROM news_tag
    WHERE news_tag.news_id = news_article.news_article_id
  ) AS tags
) news_tags ON TRUE
WHERE user_profile.user_name_id = 'mazen-shaban'
ORDER BY news.updated_on DESC;
















/************************************************/
/**/
/************************************************/

/*************************/
/**/
/*************************/
/*
INSERT INTO users
  ( user_name_id, email, password, country_phone_code, phone_number )
VALUES
  ( $1, $2, $3, $4, $5 )
RETURNING *;
*/
INSERT INTO
  users ( user_name_id, email, password, country_phone_code, phone_number )
VALUES ( 'henry_cavel', 'henry_cavel@gmail.com', 'henry_cavel123', '1', '1111111' )
RETURNING *;

SELECT * FROM users;

/*
WITH add_new_user_profile as (
  INSERT INTO user_profile
    ( user_id, first_name, last_name, date_of_birth, country, state, city, gender )
  VALUES
    ( $1, $2, $3, $4, $5, $6, $7, $8 )
  RETURNING *
),
add_new_user_experience as (
  INSERT INTO users_experience
    ( user_id )
  VALUES
    ( $1 )
  RETURNING id
)

SELECT * FROM add_new_user_profile, add_new_user_experience;
*/

INSERT INTO user_profile
  ( user_id, first_name, last_name, date_of_birth, country, state, gender )
VALUES
  ( '6212a5c1-7831-4af8-8c5d-8b3afb2ea3fb', 'Henry', 'Cavel', 'Thu Jun 22 2000 00:00:00+03', 'Egypt', 'Cairo', 'male' )
RETURNING *;

INSERT INTO users_experience 
  ( user_id, cv, experience, education, licenses_and_certifications, skills_and_endorsements )
VALUES
  ( '6212a5c1-7831-4af8-8c5d-8b3afb2ea3fb', '', '', '', '', '' )
RETURNING *;


/*************************/
/**/
/*************************/

/*
SELECT
  users.*,

  user_profile.*,

  users_experience.*

FROM
  users
JOIN user_profile
  ON user_profile.user_id = users.id
JOIN users_experience
  ON users_experience.user_id = users.id
WHERE users.email = 'test@testing.com';
*/

/*
SELECT
  users.*,

  user_profile.*,

  users_experience.*

FROM
  users
JOIN user_profile
  ON user_profile.user_id = users.id
JOIN users_experience
  ON users_experience.user_id = users.id
WHERE users.user_name_id = 'mr-tester';
*/





















































/************************************************/
/**/
/************************************************/
INSERT INTO posts
  ( author_id, format_type, title, slug, image, meta_description, content )
VALUES
 ('e75c463b-ca12-40eb-b8cf-8bc49f27f299',
 'md',
 'Getting Started with NextJS',
 'getting-started-with-nextjs',
 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fscene360.com%2Fwp-content%2Fuploads%2F2016%2F03%2Fcool-animated-gif-28.gif&f=1&nofb=1',
 'NextJS is the React framework for production - it makes building full-stack React apps and sites a breeze and ships with built-in SSR.',
 'NextJS is a **framework for ReactJS**.\n Wait a second ... a "framework" for React? Is not React itself already a framework for JavaScript?\n Well ... first of all, React is a "library" for JavaScript. That seems to be important for some people.\n Not for me, but still, there is a valid point: React already is a framework/library for JavaScript. So it is already an extra layer on top of JS.\n ## Why would we then need NextJS?\n Because NextJS makes building React apps easier - especially React apps that should have server-side rendering (though it does way more than just take care of that).\n - File-based Routing\n - Built-in Page Pre-rendering\n - Rich Data Fetching Capabilities\n - Image Optimization\n - Much More\n ## File-based Routing\n ![Create routes via your file + folder structure](https://miro.medium.com/max/1000/1*htbUdWgFQ3a94PMEvBr_hQ.png)\n ... More content ...\n To see my profile click [here](/profile/mazen-mohamed)\n'
 )
RETURNING *;


						UPDATE posts SET
							format_type='md',
              title='Getting Started with NextJS',
              meta_title=null,
              slug='getting-started-with-nextjs',
              image='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fscene360.com%2Fwp-content%2Fuploads%2F2016%2F03%2Fcool-animated-gif-28.gif&f=1&nofb=1',
              meta_description='NextJS is the React framework for production - it makes building full-stack React apps and sites a breeze and ships with built-in SSR.',
              excerpt=null,
              content='NextJS is a **framework for ReactJS**.\n Wait a second ... a "framework" for React? Is not React itself already a framework for JavaScript?\n Well ... first of all, React is a "library" for JavaScript. That seems to be important for some people.\n Not for me, but still, there is a valid point: React already is a framework/library for JavaScript. So it is already an extra layer on top of JS.\n ## Why would we then need NextJS?\n Because NextJS makes building React apps easier - especially React apps that should have server-side rendering (though it does way more than just take care of that).\n - File-based Routing\n - Built-in Page Pre-rendering\n - Rich Data Fetching Capabilities\n - Image Optimization\n - Much More\n ## File-based Routing\n ![Create routes via your file + folder structure](https://miro.medium.com/max/1000/1*htbUdWgFQ3a94PMEvBr_hQ.png)\n ... More content ...\n To see my profile click [here](/profile/mazen-mohamed)\n',
              updated_on=NOW()
						WHERE id='f1faa642-3fbc-4f4a-924c-921d1060b526' AND author_id='e75c463b-ca12-40eb-b8cf-8bc49f27f299'
						RETURNING *;

INSERT INTO posts
  (author_id, format_type, title, slug, image, meta_description, content )
VALUES
 ('6212a5c1-7831-4af8-8c5d-8b3afb2ea3fb', 'md', 'Getting Started with NextJS Now', 'getting-started-with-nextjs-now', 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fscene360.com%2Fwp-content%2Fuploads%2F2016%2F03%2Fcool-animated-gif-28.gif&f=1&nofb=1', 'NextJS is the React framework for production - it makes building full-stack React apps and sites a breeze and ships with built-in SSR.', 
 'NextJS is a **framework for ReactJS**.\n Wait a second ... a "framework" for React? Is not React itself already a framework for JavaScript?\n Well ... first of all, React is a "library" for JavaScript. That seems to be important for some people.\n Not for me, but still, there is a valid point: React already is a framework/library for JavaScript. So it is already an extra layer on top of JS.\n ## Why would we then need NextJS?\n Because NextJS makes building React apps easier - especially React apps that should have server-side rendering (though it does way more than just take care of that).\n - File-based Routing\n - Built-in Page Pre-rendering\n - Rich Data Fetching Capabilities\n - Image Optimization\n - Much More\n ## File-based Routing\n ![Create routes via your file + folder structure](https://miro.medium.com/max/1000/1*htbUdWgFQ3a94PMEvBr_hQ.png)\n ... More content ...\n To see my profile click [here](/profile/mazen-mohamed)\n')
RETURNING *;

SELECT * FROM posts;

-- DELETE FROM post_tags;

BEGIN;

  INSERT INTO post_tags (post_id, name) VALUES ('f1faa642-3fbc-4f4a-924c-921d1060b526', 'javascript') RETURNING *;

  INSERT INTO post_tags (post_id, name) VALUES ('f1faa642-3fbc-4f4a-924c-921d1060b526', 'js') RETURNING *;

  INSERT INTO post_tags (post_id, name) VALUES ('f1faa642-3fbc-4f4a-924c-921d1060b526', 'next.js') RETURNING *;

COMMIT;

BEGIN;

  INSERT INTO post_tags (post_id, name) VALUES ('15217296-710d-48c2-9b85-60ff24d0335f', 'javascript') RETURNING *;

  INSERT INTO post_tags (post_id, name) VALUES ('15217296-710d-48c2-9b85-60ff24d0335f', 'js') RETURNING *;

  INSERT INTO post_tags (post_id, name) VALUES ('15217296-710d-48c2-9b85-60ff24d0335f', 'next.js') RETURNING *;

END;


WITH add_post_tag_0 AS (
INSERT INTO post_tags (post_id, name) VALUES ('f1faa642-3fbc-4f4a-924c-921d1060b526', 'javascript') RETURNING *
), add_post_tag_1 AS (
INSERT INTO post_tags (post_id, name) VALUES ('f1faa642-3fbc-4f4a-924c-921d1060b526', 'js') RETURNING *
), add_post_tag_2 AS (
INSERT INTO post_tags (post_id, name) VALUES ('f1faa642-3fbc-4f4a-924c-921d1060b526', 'next') RETURNING *
)
SELECT * FROM add_post_tag_0, add_post_tag_1, add_post_tag_2;

SELECT * FROM users;

SELECT * FROM user_profile;

SELECT * FROM users_experience;






SELECT
  users.user_name_id,
  
  user_profile.first_name,
  user_profile.last_name,
  user_profile.profile_picture,
  user_profile.cover_photo,

  posts.id,
  posts.author_id,
  posts.format_type,
  posts.title,
  posts.meta_title,
  posts.slug,
  posts.image,
  posts.meta_description,
  posts.excerpt,
  posts.content,
  posts.likes_users_id,
  posts.likes,
  posts.created_at,
  posts.updated_on,

  post_tags.tags

FROM
  users
JOIN user_profile
  ON user_profile.user_id = users.id
JOIN posts 
  ON posts.author_id = users.id
JOIN LATERAL(
  SELECT ARRAY (
    -- SELECT array_agg(post_tags.name) AS tags
    SELECT post_tags.name AS tags
    FROM post_tags
    -- JOIN posts
    -- ON post_tags.post_id = posts.id
    WHERE post_tags.post_id = posts.id
  ) AS tags
) post_tags ON TRUE
WHERE users.user_name_id = 'henry_cavel' ORDER BY posts.created_at DESC;


-- SELECT 
--   posts.author_id,
--   posts.format_type,
--   posts.title,
--   posts.slug,
--   posts.image,
--   posts.meta_description,
--   posts.content,
--   post_tags.tags
-- FROM   posts,
--   LATERAL  (
--     SELECT ARRAY (
--       SELECT 
--         post_tags.name
--       FROM
--         post_tags
--       JOIN posts
--       ON posts.id = post_tags.post_id
--       WHERE post_tags.post_id = posts.id
--     ) AS tags
--   ) post_tags;

-- SELECT ARRAY(SELECT name FROM post_tags);

SELECT
  posts.id,
  posts.author_id,
  posts.format_type,
  posts.title,
  posts.meta_title,
  posts.slug,
  posts.image,
  posts.meta_description,
  posts.excerpt,
  posts.content,
  posts.likes_users_id,
  posts.likes,
  posts.created_at,
  posts.updated_on,

  post_tags.tags
FROM   posts,
  LATERAL  (
    SELECT ARRAY (
      SELECT 
        post_tags.name
      FROM
        post_tags
      WHERE post_tags.post_id = posts.id
    ) AS tags
  ) post_tags
WHERE posts.author_id = '6212a5c1-7831-4af8-8c5d-8b3afb2ea3fb' AND posts.slug = 'getting-started-with-nextjs';





SELECT
  posts.id,
  posts.author_id,
  posts.format_type,
  posts.title,
  posts.meta_title,
  posts.slug,
  posts.image,
  posts.meta_description,
  posts.excerpt,
  posts.content,
  posts.likes_users_id,
  posts.likes,
  posts.created_at,
  posts.updated_on,

  post_tags.tags
  
FROM   posts,
  LATERAL  (
      SELECT 
        json_agg (post_tags.name) AS tags
      FROM
        post_tags
      WHERE post_tags.post_id = posts.id
  ) post_tags
WHERE posts.author_id = '6212a5c1-7831-4af8-8c5d-8b3afb2ea3fb' ORDER BY posts.updated_on DESC; -- AND posts.slug = 'getting-started-with-nextjs';










SELECT
  posts.id,
  posts.author_id,
  posts.format_type,
  posts.title,
  posts.meta_title,
  posts.slug,
  posts.image,
  posts.meta_description,
  posts.excerpt,
  posts.content,
  posts.likes_users_id,
  posts.likes,
  posts.created_at,
  posts.updated_on,

  post_tags.tags
  
FROM   posts,
  LATERAL  (
      SELECT 
        json_agg (post_tags.name) AS tags
      FROM
        post_tags
      WHERE post_tags.post_id = posts.id
  ) post_tags
WHERE posts.author_id = '6212a5c1-7831-4af8-8c5d-8b3afb2ea3fb' ORDER BY posts.updated_on DESC; -- AND posts.slug = 'getting-started-with-nextjs';



















SELECT

  posts.id,
  posts.author_id,
  posts.format_type,
  posts.title,
  posts.meta_title,
  posts.slug,
  posts.image,
  posts.meta_description,
  posts.excerpt,
  posts.content,
  posts.likes_users_id,
  posts.likes,
  posts.created_at,
  posts.updated_on,

  users.user_name_id,
  user_profile.first_name,
  user_profile.last_name,
  user_profile.profile_picture
FROM
  posts
JOIN users 
  ON posts.author_id = users.id
JOIN post_tags 
  ON post_tags.post_id = posts.id
JOIN user_profile 
  ON user_profile.user_id = users.id
WHERE posts.author_id = '6212a5c1-7831-4af8-8c5d-8b3afb2ea3fb'
ORDER BY posts.created_at DESC;











SELECT

  posts.id,
  posts.author_id,
  posts.format_type,
  posts.title,
  posts.meta_title,
  posts.slug,
  posts.image,
  posts.meta_description,
  posts.excerpt,
  posts.content,
  posts.likes_users_id,
  posts.likes,
  posts.created_at,
  posts.updated_on,

  users.user_name_id,
  user_profile.first_name,
  user_profile.last_name,
  user_profile.profile_picture
FROM
  posts
JOIN users 
  ON posts.author_id = users.id -- AND users.user_name_id = "henry_cavel"
JOIN user_profile 
  ON user_profile.user_id = users.id
WHERE posts.author_id = '6212a5c1-7831-4af8-8c5d-8b3afb2ea3fb'
ORDER BY posts.created_at DESC;







-- SELECT *
-- FROM posts
-- JOIN LATERAL(
--   -- SELECT ARRAY (
--     SELECT array_agg(post_tags.name) AS tags
--     FROM post_tags
--     JOIN posts
--     ON post_tags.post_id = posts.id
--   -- ) AS tags
-- ) posts_array ON TRUE; posts_array.post_id = posts.id;
-- LEFT OUTER JOIN bar ON (foo_bars ->> 'id') :: BIGINT = bar.ID;

-- FROM
--   posts
-- JOIN users 
--   ON posts.author_id = users.id -- AND users.user_name_id = "henry_cavel"
-- JOIN user_profile 
--   ON user_profile.user_id = users.id
-- WHERE posts.author_id = '6212a5c1-7831-4af8-8c5d-8b3afb2ea3fb'
-- ORDER BY posts.created_at DESC;
















































SELECT
users.*
posts_array

FROM   users,
  LATERAL  (
    SELECT ARRAY (
SELECT

      SELECT ROW (
  posts.id,
  posts.author_id,
  posts.format_type,
  posts.title,
  posts.meta_title,
  posts.slug,
  posts.image,
  posts.meta_description,
  posts.excerpt,
  posts.content,
  posts.likes_users_id,
  posts.likes,
  posts.created_at,
  posts.updated_on,

  post_tags.tags
      )
FROM   posts,
  LATERAL  (
    SELECT ARRAY (
      SELECT 
        post_tags.name
      FROM
        post_tags
      WHERE post_tags.post_id = posts.id
    ) AS tags
  ) post_tags
WHERE posts.author_id = users.id -- '6212a5c1-7831-4af8-8c5d-8b3afb2ea3fb'
  )
  ) posts_array WHERE users.id = '6212a5c1-7831-4af8-8c5d-8b3afb2ea3fb';




























/*
SELECT
  posts.author_id,
  posts.format_type,
  posts.title,
  posts.slug,
  posts.image,
  posts.meta_description,
  posts.content,

  array_agg(post_tags.name) AS tags
FROM
  posts
JOIN post_tags
  ON post_tags.post_id = posts.id
  GROUP BY posts.id;
-- WHERE users.id = '6212a5c1-7831-4af8-8c5d-8b3afb2ea3fb'
  -- HAVING users.id = '6212a5c1-7831-4af8-8c5d-8b3afb2ea3fb'
;
*/






















-- Failed Update
UPDATE
  users
SET
  email=('henry_cavel123@gmail.com')
WHERE
  id='fa116147-930d-4be3-afe8-7140dbc8196n'
RETURNING *;
-- ERROR:  invalid input syntax for type uuid: "fa116147-930d-4be3-afe8-7140dbc8196n"
-- LINE 6:   id='fa116147-930d-4be3-afe8-7140dbc8196n'

-- Successful Update
UPDATE
  users
SET
  email=('henry_cavel123@gmail.com')
WHERE
  id='6212a5c1-7831-4af8-8c5d-8b3afb2ea3fb'
RETURNING *;





























-- CREATE TABLE contacts (
-- 	id serial PRIMARY KEY,
-- 	name VARCHAR (100),
-- 	phones TEXT []
-- );

-- Search in PostgreSQL Array
-- Suppose, we want to know who has the phone number (408)-589-5555 regardless of position of the phone number in the phones array, we use ANY() function as follows:

-- SELECT
-- 	name,
-- 	phones
-- FROM
-- 	contacts
-- WHERE
-- 	'(408)-589-5555' = ANY (phones);

-- Expand Arrays
-- PostgreSQL provides the unnest() function to expand an array to a list of rows. For example,  the following query expands all phone numbers of the phones array.

-- SELECT
-- 	name,
-- 	unnest(phones)
-- FROM
-- 	contacts;

-- This answer is the simplest I think: https://stackoverflow.com/a/6535089/673187

-- SELECT array(SELECT unnest(:array1) EXCEPT SELECT unnest(:array2));
-- so you can easily use it in an UPDATE command, when you need to remove some elements from an array column:

-- UPDATE table1 SET array1_column=(SELECT array(SELECT unnest(array1_column) EXCEPT SELECT unnest('{2, 3}'::int[])));








-- Postgres: JOIN on an array field
-- Say we create two tables (users and groups), where users are in groups:

-- create table users (
--   id int unique,
--   name varchar unique
-- );

-- create table groups (
--   id int unique,
--   name varchar unique,
--   member_users int[],
--   member_groups int[]
-- );
-- The groups own the user memberships, rather than having an intermediate table with the relation.

-- Now, we want to join them, so we can simply do this:

-- select *
-- from groups join users
--   on users.id = ANY (groups.member_users)






























