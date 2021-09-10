# news_quiz

news quiz id _PRIMARY KEY_,

title _TEXT_ NOT NULL (Length > 3),

description _TEXT_ NOT NULL (Length > 25),

allowed for _TEXT_ NOT NULL IN (anyone || any user || groups),

star rating _BIGINT_ DEFAULT 0,

date of start _TIMESTAMP WITH TIME_,

duration _BIGINT_ 'numbers_in_seconds',

date of end _TIMESTAMP WITH TIME_,

created at _TIMESTAMP WITH TIME_,

updated on _TIMESTAMP WITH TIME_,

content: {

},

> **if** (allowed_for === groups) {

_TABLE_ news_quiz_group (

news quiz group id _PRIMARY KEY_,

news_quiz_id === news_quiz REFERENCE,

_TABLE_ news_quiz_group_member (

news quiz group member id === user account id REFERENCE,

news quiz group id === news quiz group id REFERENCE,

)

)

<!-- - || (groups: [group ??, ...]) -->

}

_TABLE_ tag

_TABLE_ comment

_TABLE_ vote
