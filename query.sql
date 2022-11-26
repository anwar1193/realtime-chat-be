create table users (
    id varchar primary key,
    name varchar(50),
    email varchar(50),
    password varchar,
    is_verified boolean,
    token varchar,
    photo varchar,
    shortname varchar(20),
    bio varchar(255),
    phone varchar(15),
    created_at date,
);

create table grup(
    id varchar primary key,
    name_grup varchar(50),
    created_at date,
    photo varchar,
    sender varchar,
    message varchar
);

create table messages(
    id VARCHAR primary key, 
    sender_id varchar not null,
    receiver_id varchar not null,
    message varchar,
    created_at date,
    sender varchar,
    photo varchar
);