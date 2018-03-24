DROP TABLE IF EXISTS nearby;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  business_name TEXT NOT NULL,
  -- optimize later by not makiung unique, but passing in int
  place_id SERIAL UNIQUE NOT NULL,
  google_rating REAL NOT NULL,
  zagat_food_rating REAL NOT NULL,
  review_count INT NOT NULL,
  short_description TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  price_level SMALLINT NOT NULL,
  business_type TEXT NOT NULL,
  longitude REAL NOT NULL,
  latitude REAL NOT NULL
);

CREATE TABLE nearby (
  place_id INTEGER NOT NULL,
  recommended INTEGER NOT NULL
);

CREATE TABLE photos (
  place_id INTEGER NOT NULL,
  photo_url VARCHAR(2084)
);

-- terminal command to run the sql file, naming which database to do the work in
-- psql -f pg-restaurant.sql sagat_sql 