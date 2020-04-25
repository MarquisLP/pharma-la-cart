CREATE TABLE client(
    id          SERIAL PRIMARY KEY,
    name        varchar(255)
);

CREATE TABLE admin(
    admin_id    SERIAL PRIMARY KEY,
    email       varchar(255),
    hash        char(60),
    verified    boolean DEFAULT FALSE
);

CREATE TABLE admin_verification(
    admin_verification_id    SERIAL PRIMARY KEY,
    admin_id    integer REFERENCES admin(admin_id),
    token       char(128),
    expiration  timestamp
);
