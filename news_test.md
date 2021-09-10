# news_test

news test id _PRIMARY KEY_,

title _TEXT_ NOT NULL (Length > 3),

description _TEXT_ NOT NULL (Length > 25),

allowed for _TEXT_ NOT NULL IN (anyone || any user || groups),

star rating _BIGINT_ DEFAULT 0,

date of start _TIMESTAMP WITH TIME_,

duration _BIGINT_ 'numbers_in_seconds',

date of end _TIMESTAMP WITH TIME_,

content: {

},

## Related _TABLES_

_TABLE_ news

> **if** (allowed for === groups) {

_TABLE_ news_test_group

_TABLE_ news_test_group_member

}

_TABLE_ tag

_TABLE_ comment

_TABLE_ vote
