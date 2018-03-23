DROP TABLE IF EXISTS nearby;
DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  business_name TEXT NOT NULL,
  place_id SERIAL UNIQUE NOT NULL,
  google_rating REAL NOT NULL,
  zagat_food_rating REAL NOT NULL,
  review_count INT NOT NULL,
  short_description TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  price_level SMALLINT NOT NULL,
  business_type TEXT NOT NULL,
  longitude REAL NOT NULL,
  latitude REAL NOT NULL,
  photos TEXT[] NOT NULL
);

CREATE TABLE nearby (
  place_id INTEGER NOT NULL,
  recommended INTEGER NOT NULL
);

-- terminal command to run the sql file, naming which database to do the work in
-- psql -f pg-restaurant.sql sagat_sql 