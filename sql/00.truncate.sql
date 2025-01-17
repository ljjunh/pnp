drop database pnp;
create database pnp;
use pnp;

create table if not exists accounts
(
    account_id          bigint auto_increment
        primary key,
    created_at          datetime(6)  not null,
    updated_at          datetime(6)  not null,
    user_id             bigint       null,
    provider            varchar(255) not null,
    provider_account_id varchar(255) not null,
    type                varchar(255) not null,
    constraint accounts_unique_provider_account_id
        unique (provider, provider_account_id)
);

create table if not exists amenities
(
    available  bit          not null,
    amenity_id bigint auto_increment
        primary key,
    category   varchar(255) not null,
    icon       varchar(255) not null,
    sub_title  varchar(255) null,
    title      varchar(255) not null
);

create table if not exists languages
(
    language_id int auto_increment
        primary key,
    content     varchar(100) null,
    constraint languages_unique_content
        unique (content)
);

create table if not exists payments
(
    amount            int                                                 not null,
    id                int auto_increment
        primary key,
    paid              int                                                 not null,
    vat               int                                                 not null,
    created_at        datetime(6)                                         not null,
    order_number      bigint                                              null,
    paid_at           datetime(6)                                         not null,
    status_updated_at datetime(6)                                         not null,
    updated_at        datetime(6)                                         not null,
    user_id           bigint                                              null,
    currency          varchar(255)                                        not null,
    method            varchar(255)                                        not null,
    order_name        varchar(255)                                        not null,
    receipt_url       varchar(255)                                        null,
    transaction_id    varchar(255)                                        not null,
    status            enum ('PAY_COMPLETED', 'PAY_FAILED', 'PAY_PENDING') not null,
    constraint payments_unique_order_number
        unique (order_number),
    constraint payments_unique_transaction_id
        unique (transaction_id)
);

create table if not exists profiles
(
    is_super_host   bit          not null,
    is_verified     bit          not null,
    reviews_average double       not null,
    reviews_count   int          not null,
    created_at      datetime(6)  not null,
    host_started_at datetime(6)  not null,
    profile_id      bigint auto_increment
        primary key,
    updated_at      datetime(6)  not null,
    user_id         bigint       null,
    about           text         null,
    address         varchar(255) null,
    birth           varchar(255) null,
    book_title      varchar(255) null,
    favorite_song   varchar(255) null,
    hobby           varchar(255) null,
    interested      varchar(255) null,
    job             varchar(255) null,
    liked           varchar(255) null,
    no_talented     varchar(255) null,
    pet             varchar(255) null,
    school          varchar(255) null,
    constraint UK4ixsj6aqve5pxrbw2u0oyk8bb
        unique (user_id)
);

create table if not exists reservations
(
    capacity       int                                                                                            not null,
    days           int                                                                                            not null,
    price          int                                                                                            not null,
    check_in       datetime(6)                                                                                    not null,
    check_out      datetime(6)                                                                                    not null,
    created_at     datetime(6)                                                                                    not null,
    reservation_id bigint auto_increment
        primary key,
    room_id        bigint                                                                                         null,
    updated_at     datetime(6)                                                                                    not null,
    user_id        bigint                                                                                         null,
    order_number   varchar(255)                                                                                   not null,
    status         enum ('CANCELED', 'COMPLETED', 'CONFIRMED', 'PAYMENT_COMPLETED', 'PAYMENT_PENDING', 'PENDING') not null,
    constraint reservations_unique_order_number
        unique (order_number)
);

create table if not exists reviews
(
    accuracy      int          not null,
    check_in      int          not null,
    cleanliness   int          not null,
    communication int          not null,
    location      int          not null,
    value         int          not null,
    created_at    datetime(6)  not null,
    review_id     bigint auto_increment
        primary key,
    room_id       bigint       null,
    updated_at    datetime(6)  not null,
    user_id       bigint       null,
    airbnb_id     varchar(255) null,
    content       text         null,
    order_number  varchar(255) null,
    constraint reviews_unique_airbnb_id
        unique (airbnb_id),
    constraint reviews_unique_order_number
        unique (order_number)
);

create table if not exists room_amenities
(
    room_amenity_id int auto_increment
        primary key,
    amenity_id      bigint null,
    room_id         bigint null,
    constraint room_amenities_unique_room_id_amenity_ids
        unique (room_id, amenity_id)
);

create table if not exists room_images
(
    room_id       bigint                         null,
    room_image_id bigint auto_increment
        primary key,
    caption       varchar(1000)                  not null,
    image_link    varchar(255)                   not null,
    orientation   enum ('LANDSCAPE', 'PORTRAIT') not null
);

create table if not exists room_rules
(
    room_rule_id int auto_increment
        primary key,
    room_id      bigint null,
    rule_id      bigint null,
    constraint room_rules_unique_room_id_rule_id
        unique (room_id, rule_id)
);

create table if not exists rooms
(
    bathroom        int    default 0                           not null,
    bed             int    default 0                           not null,
    bedroom         int    default 0                           not null,
    capacity        int    default 0                           not null,
    latitude        double default 0                           not null,
    longitude       double default 0                           not null,
    price           int    default 0                           not null,
    reviews_average double                                     not null,
    reviews_count   int                                        not null,
    created_at      datetime(6)                                not null,
    room_id         bigint auto_increment
        primary key,
    updated_at      datetime(6)                                not null,
    user_id         bigint                                     null,
    airbnb_id       varchar(255)                               null,
    airbnb_link     varchar(255)                               null,
    check_in        varchar(255)                               null,
    check_in_type   varchar(255)                               null,
    check_out       varchar(255)                               null,
    description     text                                       null,
    location        varchar(255)                               null,
    property_type   varchar(255)                               null,
    room_type       varchar(255)                               null,
    seo_description text                                       null,
    seo_title       varchar(255)                               null,
    thumbnail       varchar(255)                               null,
    title           varchar(255)                               null,
    status          enum ('COMPLETED', 'DRAFT', 'IN_PROGRESS') not null,
    constraint rooms_unique_airbnb_id
        unique (airbnb_id),
    constraint rooms_unique_airbnb_link
        unique (airbnb_link)
);

create table if not exists rules
(
    rule_id  bigint auto_increment
        primary key,
    category varchar(255) not null,
    icon     varchar(255) not null,
    title    varchar(255) not null
);

create table if not exists tags
(
    tag_id  bigint auto_increment
        primary key,
    content varchar(100) not null,
    constraint tags_unique_content
        unique (content)
);

create table if not exists user_languages
(
    id          int auto_increment
        primary key,
    language_id int    null,
    user_id     bigint null,
    constraint user_languages_unique_user_id_language_id
        unique (user_id, language_id)
);

create table if not exists user_tags
(
    tag_id      bigint null,
    user_id     bigint null,
    user_tag_id bigint auto_increment
        primary key,
    constraint user_tags_unique_host_id_tag_id
        unique (user_id, tag_id)
);

create table if not exists users
(
    created_at     datetime(6)  not null,
    email_verified datetime(6)  null,
    updated_at     datetime(6)  not null,
    user_id        bigint auto_increment
        primary key,
    airbnb_id      varchar(255) null,
    email          varchar(255) not null,
    image          varchar(255) null,
    name           varchar(255) null,
    username       varchar(255) not null,
    constraint users_unique_airbnb_id
        unique (airbnb_id),
    constraint users_unique_username
        unique (username)
);

