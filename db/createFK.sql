ALTER TABLE nearby
ADD CONSTRAINT place_id
FOREIGN KEY (place_id) REFERENCES restaurants;
ALTER TABLE nearby
ADD CONSTRAINT recommended
FOREIGN KEY (place_id) REFERENCES restaurants;