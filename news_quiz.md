# news_quiz

news_quiz_id,

title TEXT NOT NULL (Length > 3),

description TEXT NOT NULL (Length > 25),

allowed_for TEXT NOT NULL IN (anyone || any_user || groups),

star_rating BIGINT DEFAULT 0,

date_of_start TIMESTAMP WITH TIME 'start',

duration BIGINT 'numbers_in_seconds',

date_of_end TIMESTAMP WITH TIME 'end',

content: {

},

> **if** (allowed_for === groups) {

_TABLE_ news_quiz_group (

news_quiz_group_id,

news_quiz_id REFERENCE,

_TABLE_ news_quiz_group_member (

news_quiz_group_member === user_account_id,

news_quiz_group_id REFERENCE,

)

)

<!-- - || (groups: [group\_??, ...]) -->

}

_TABLE_ tag

_TABLE_ comment

_TABLE_ vote
