-- Active: 1733640607380@@127.0.0.1@3306@pnp
START TRANSACTION;

SET FOREIGN_KEY_CHECKS = 0;
use pnp;
TRUNCATE TABLE reviews;
TRUNCATE TABLE room_amenities;
TRUNCATE TABLE room_rules;
TRUNCATE TABLE room_images;
TRUNCATE TABLE user_tags;
TRUNCATE TABLE rooms;
TRUNCATE TABLE amenities;
TRUNCATE TABLE rules;
TRUNCATE TABLE accounts;
TRUNCATE TABLE profiles;
TRUNCATE TABLE tags;
TRUNCATE TABLE users;
TRUNCATE TABLE languages;
TRUNCATE TABLE user_languages;
SET FOREIGN_KEY_CHECKS = 1;

COMMIT;
