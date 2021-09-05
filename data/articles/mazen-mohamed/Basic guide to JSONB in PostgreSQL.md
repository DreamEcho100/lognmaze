---
title: Basic guide to JSONB in PostgreSQL
tags: sql postgresql json
image_alt: PostgreSQL + json
image_src: https://i.morioh.com/200728/b25ed22b.webp
description: Basic guide to JSONB in PostgreSQL You may encounter (or have already encountered) a situation you are dealing with JSON in your application and you want to store it in your database. Or have unpredictable data or have one or multiple columns in the table that are optional.

In these situations an object-oriented, NoSQL database makes sense.

But you're probably going to have to learn a new data query syntax, data creation statement, install new software, and running some new servers in production. Now rather than developing your features, you are going to be spending valuable time learning, experimenting.

Well my friend you can rest at ease since we will talk a little about how you can use PostgreSQL for all your JSON needs.
---

You may encounter (or have already encountered) a situation you are dealing with JSON in your application and you want to store it in your database. Or have unpredictable data or have one or multiple columns in the table that are optional.

In these situations an object-oriented, NoSQL database makes sense.

But you're probably going to have to learn a new data query syntax, data creation statement, install new software, and running some new server in production. Now rather than developing your features, you are going to be spending valuable time learning, experimenting.

Well my friend you can rest at ease since we will talk a little about how you can use PostgreSQL for all your JSON needs.

But let start first with what is JSON?

## What is JSON?

JSON (JavaScript Object Notation) is a lightweight data-interchange format. It is easy for humans to read and write. It is easy for machines to parse and generate. It is based on a subset of the JavaScript Programming Language Standard ECMA-262 3rd Edition - December 1999. JSON is a text format that is completely language independent but uses conventions that are familiar to programmers of the C-family of languages, including C, C++, C#, Java, JavaScript, Perl, Python, and many others. These properties make JSON an ideal data-interchange language.

JSON is built on two structures:

- A collection of name/value pairs. In various languages, this is realized as an object, record, dictionary, hash table, keyed list, or associative array.

- An ordered list of values. In most languages, this is realized as an array, vector, list, or sequence.

For more about JSON visit [json.org](https://www.json.org/json-en.html).

## JSON in PostgreSQL (JSON vs JSONB)

### JSON

Since 9.2, released in September 2012, PostgreSQL has had a JSON type. This original JSON type was not much more than just a simple storage field that let you put JSON into your database table. It is just a simple text field that checks to make sure your JSON is well-formed. Other than that it doesn't do much and I would not recommend using it.

With PostgreSQL release 9.4 in December 2014, a JSOB type was added. Though the running joke is that the B stands for better it really stands for Binary. When you put JSON data into a JSONB column, in addition to checking for well-formed JSON, you now have the ability to indexing and query, and retrieve portions of the document. Generally for all your work you should use JSONB unless you have a compelling reason not to.

If you’re storing some form of log data you rarely need to query, JSON can work fine. Because it’s so simple, it will have a lot higher write throughput. For anything more complex, I’d recommend using JSONB, which is covered below.

### JSONB

Finally, in Postgres 9.4 we got real and proper JSON in the form of JSONB. Though the running joke is that the B stands for better it really stands for Binary. JSONB is a binary representation of JSON, which means it’s compressed and more efficient for storage than just text. It also has similar plumbing of hstore underneath. In fact, once upon a time, there was almost hstore2 and a separate JSON type, but the two converged into the JSONB we have today.

JSONB is largely what you’d expect from a JSON datatype. It allows nested structures, use of basic data types, and has a number of built-in functions for working with it. Though the best part similar to hstore is the indexing. Creating a GIN index on a JSONB column will create an index on every key and value within that JSON document. That with the ability to nest within the document means JSONB is superior to hstore in most cases

Read more about [When to use unstructured datatypes in Postgres–Hstore vs. JSON vs. JSONB](https://www.citusdata.com/blog/2016/07/14/choosing-nosql-hstore-json-jsonb/)

## Creating a JSONB column

Let's say we're building a user_profile table with (id, first_name, last_name, user_name_id, email, phone_number, password) columns and an extra column with a JSONB type that will hold things like preferences, email_verified, ...

```sql
CREATE TABLE user_profile (
  id SERIAL NOT NULL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  user_name_id TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  phone_number TEXT NOT NULL,
  password TEXT NOT NULL,
  extra JSONB
);

INSERT INTO user_profile (id, first_name, last_name, user_name_id, email, phone_number, password, extra)
VALUES (1, 'John', 'Doe', 'john-doe', 'test@gmail.com', '12345678', '011265048347', '{"email_verified": false, "preferences" : {"theme": "light","font_size": "2rem"}}');

INSERT INTO user_profile (id, first_name, last_name, user_name_id, email, phone_number, password, extra)
VALUES (2, 'Jane', 'Doe', 'jane-doe', 'test2@gmail.com', '87654321', '011265048347', '{"email_verified": true, "preferences" : {"theme": "light","font_size": "2rem"}}');

SELECT * FROM user_profile;
```

```bash
 id | first_name | last_name | user_name_id |      email      | phone_number |   password   |                                       extra
----+------------+-----------+--------------+-----------------+--------------+--------------+-----------------------------------------------------------------------------------
  1 | John       | Doe       | john-doe     | test@gmail.com  | 12345678     | 011265048347 | {"preferences": {"theme": "light"}, "email_verified": false}
  2 | Jane       | Doe       | jane-doe     | test2@gmail.com | 87654321     | 011265048347 | {"preferences": {"theme": "light"}, "email_verified": true}
(2 rows)
```

```sql
SELECT extra FROM user_profile;
```

```bash
                                       extra
-----------------------------------------------------------------------------------
 {"preferences": {"theme": "light"}, "email_verified": false}
 {"preferences": {"theme": "light"}, "email_verified": true}
(2 rows)
```

## Querying data in JSON

### -> vs ->> operator

PostgreSQL provides two native operators -> and ->> to help you query JSON data.

The operator -> returns JSON object field as JSON so it can be chained.

```sql
SELECT extra -> 'preferences' AS preferences FROM user_profile;
```

```bash
               preferences
-----------------------------------------
 {"theme": "light"}
 {"theme": "light"}
(2 rows)
```

```sql
SELECT extra -> 'preferences' -> 'theme' AS theme FROM user_profile;
```

```bash
  theme
---------
 "light"
 "light"
(2 rows)
```

The operator ->> returns JSON object field as text so it can't be chained.

```sql
SELECT extra ->> 'preferences' AS preferences FROM user_profile;
```

```bash
               preferences
-----------------------------------------
 {"theme": "light"}
 {"theme": "light"}
(2 rows)
```

This will return an error

```sql
postgres=# SELECT extra ->> 'preferences' ->> 'theme' AS theme FROM user_profile;
```

```bash
ERROR:  operator does not exist: text ->> unknown
LINE 1: SELECT extra ->> 'preferences' ->> 'theme' AS theme FROM use...
                                       ^
HINT:  No operator matches the given name and argument types. You might need to add explicit type casts.
```

And we can use one or multiple -> with one ->> at the end

```sql
SELECT extra -> 'preferences' ->> 'theme' AS theme FROM user_profile;
```

```bash
 theme
-------
 light
 light
(2 rows)
```

## Insert data in JSON

### Insert into JSON using the **_||_** operator

- The || operator Concatenate two JSONB values into a new JSONB value.

- So you can concatenate the column with the new values in a JSON format.

#### Insert into JSON Surface, level one path using the **||** operator

```sql
UPDATE user_profile
SET extra = extra || '{"phone_number_verified": true}'
WHERE id = 1
RETURNING extra;
```

```bash
                                                      extra
----------------------------------------------------------------------------------------------------------------
{"preferences": {"theme": "light"}, "email_verified": false, "phone_number_verified": true}
(1 row)


UPDATE 1
```

### Insert into JSON using the **jsonb_insert** function

#### Insert into JSON in one or multiple levels using the **jsonb_insert** function

The format for jsonb_insert:

```sql
jsonb_insert(
  target jsonb,
  path text[],
  new_value jsonb
  [, insert_after boolean]
)
```

Returns target with new_value inserted. If target section designated by path is in a JSONB array, new_value will be inserted before target or after if insert_after is true (default is false). If the target section designated by path is in JSONB object, new_value will be inserted only if the target does not exist. As with the path oriented operators, negative integers appear in path counter from the end of JSON arrays.

```sql
UPDATE user_profile
SET extra = jsonb_insert(
"extra",
'{preferences, hide}',
'{"address": true, "phone_number": true, "email": true}'::jsonb
)
WHERE id = 1
RETURNING extra;
```

```bash
                                                                                     extra
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 {"preferences": {"hide": {"email": true, "address": true, "phone_number": true}, "theme": "dark"}, "email_verified": false, "phone_number_verified": true}
(1 row)
```

## Update data in JSON

### Updating JSON using the **||** operator

- The || operator Concatenate two JSONB values into a new JSONB value.

- So you can concatenate the column with the new values in a JSON format.

- Since the key already exists and we are using **JSONB** not **JSON** type it will override the old value

#### Updating JSON Surface, level one for one or multiple values using the **||** operator

```sql
UPDATE user_profile
SET extra = extra || '{"email_verified": true}'
WHERE id = 1
RETURNING extra;
```

```bash
                                                      extra
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
{"preferences": {"hide": {"email": true, "address": true, "phone_number": true}, "theme": "light"}, "email_verified": true, "phone_number_verified": true}
(1 row)


UPDATE 1
```

### Updating JSON using the **jsonb_set** function

The format for jsonb_set:

```sql
jsonb_set(
  target jsonb,
  path text[],
  new_value jsonb,
  [create_missing boolean try by default]
)
```

Returns target with the section designated by path replaced by new_value, or with new_value added if create_missing is true (default is true) and the item designated by path does not exist. As with the path oriented operators, negative integers appear in path counter from the end of JSON arrays.

#### Updating JSON Surface, level one path for one value using the **jsonb_set** function

- if we want to target email_verified the path would be **'{email_verified}'**.

```sql
  UPDATE user_profile
  SET extra = jsonb_set(
  "extra",
  '{email_verified}',
  'false'
  )
  WHERE id = 1
  RETURNING extra;
```

```bash
                                                      extra
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
{"preferences": {"hide": {"email": true, "address": true, "phone_number": true}, "theme": "light"}, "email_verified": false, "phone_number_verified": true}
(1 row)
```

#### Updating JSON deep, multiple levels for one value using the **jsonb_set** function

- if we want to target theme in preferences the path would be **'{preferences,theme}'**.

```sql
UPDATE user_profile
SET extra = jsonb_set(
"extra",
'{preferences, theme}',
'"dark"'
)
WHERE id = 1
RETURNING extra;
```

```bash
                                                    extra
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
{"preferences": {"hide": {"email": true, "address": true, "phone_number": true}, "theme": "dark"}, "email_verified": false, "phone_number_verified": true}
(1 row)
```

#### Updating multiple values in JSON using the **jsonb_set** function

```sql
UPDATE user_profile
SET extra = jsonb_set(
  jsonb_set(
    "extra",
    '{preferences, hide, first_name}',
    'true'
  ),
  '{preferences, hide, last_name}',
  'true'
)
WHERE id = 1
RETURNING extra;
```

```bash
                                                                                                         extra
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 {"preferences": {"hide": {"email": true, "address": true, "last_name": true, "first_name": true, "phone_number": true}, "theme": "dark"}, "email_verified": true, "phone_number_verified": true}
(1 row)
```

Ok, what's happening here?

- The inner **jsonb_set** changing the **first_name** value to **true** and returns a new data.

- The outer **jsonb_set** take the new data and change **last_name** to **true** and returns a new data.

- Then you update the **extra** column with the new modified data.

## Delete data in JSON

### Delete data in JSON using the #- operator

```sql
UPDATE user_profile
SET extra = extra #- '{preferences, hide, email}'
WHERE id = 1
RETURNING extra;
```

```bash
                                                                                                extra
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 {"preferences": {"hide": {"address": true, "last_name": true, "first_name": true, "phone_number": true}, "theme": "dark", "font_size": "2rem"}, "email_verified": true, "phone_number_verified": true}
(1 row)
```

Since the #- operator returns a JSON object so we can chain it.

```sql
UPDATE user_profile
SET extra = extra #- '{preferences, hide, first_name}' #- '{preferences, hide, last_name}'
WHERE id = 1
RETURNING extra;
```

```bash
                                                                              extra
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 {"preferences": {"hide": {"address": true, "phone_number": true}, "theme": "dark", "font_size": "2rem"}, "email_verified": true, "phone_number_verified": true}
(1 row)
```

## Resources

- [9.16. JSON Functions and Operators (postgresql.org)](https://postgresql.org/docs/current/functions-json.html)

- [When to use unstructured datatypes in Postgres–Hstore vs. JSON vs. JSONB (citusdata.com)](https://www.citusdata.com/blog/2016/07/14/choosing-nosql-hstore-json-jsonb/)

- [Using PostgreSQL for JSON Storage (blog.crunchydata.com)](https://blog.crunchydata.com/blog/using-postgresql-for-json-storage)

- [How to: use jsonb_set function in PostgreSQL (dev.to)](https://dev.to/deepika_banoth/how-to-use-jsonbset-function-in-postgresql-35eo)

- [Postgresql - update or delete a value from a nested jsonb element (stackoverflow.com)](https://stackoverflow.com/questions/44932027/postgresql-update-or-delete-a-value-from-a-nested-jsonb-element)

- [postgres jsonb_set multiple keys update (stackoverflow.com)](https://stackoverflow.com/questions/38883233/postgres-jsonb-set-multiple-keys-update)

- [How to update multiple nested keys in a json field in single update query? (stackoverflow.com)](https://stackoverflow.com/a/65842312/13961420)

- [Postgres jsonb_set multiple nested fields (stackoverflow.com)](https://stackoverflow.com/a/45483515/13961420)

- [postgresql: jsonb update multiple keys in one query (stackoverflow.com)](https://stackoverflow.com/questions/40347580/postgresql-jsonb-update-multiple-keys-in-one-query)

- [What is the difference between `->>` and `->` in Postgres SQL? (stackoverflow.com)](https://stackoverflow.com/a/47270495/13961420)
