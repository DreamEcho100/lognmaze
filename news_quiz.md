# news_quiz

title TEXT NOT NULL (Length > 3)

description TEXT NOT NULL (Length > 25)

allowed_for TEXT NOT NULL IN (anyone || any_user || groups)

date_of_start TIMESTAMP WITH TIME 'start'

duration BIGINT 'numbers_in_seconds'

date_of_end TIMESTAMP WITH TIME 'end'

content: {

}

> **if** (allowed_for === groups) {

- _TABLE_ news_quiz_group || (groups: [group\_??, ...])

}

_TABLE_ tag

_TABLE_ comment

_TABLE_ vote
