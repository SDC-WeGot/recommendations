DROP TABLE IF EXISTS nearby;
DROP TABLE IF EXISTS restaurants;

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  place_id INTEGER UNIQUE NOT NULL,
  google_rating REAL NOT NULL,
  zagat_food_rating REAL NOT NULL,
  review_count INT NOT NULL,
  short_description TEXT NOT NULL,
  neighborhood TEXT NOT NULL,
  price_level SMALLINT NOT NULL,
  type TEXT NOT NULL,
  location JSONB NOT NULL,
  photos TEXT[] NOT NULL
);

CREATE TABLE nearby (
  place_id INTEGER NOT NULL REFERENCES restaurants (place_id),
  recommended INTEGER NOT NULL REFERENCES restaurants (place_id)
);

-- terminal command to run the sql file
-- psql -f pg-resetaurant.sql sagat-sql