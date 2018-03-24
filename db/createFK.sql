ALTER TABLE nearby
ADD CONSTRAINT fk_nearby_placeid_placeid
FOREIGN KEY (place_id) REFERENCES restaurants (place_id);

ALTER TABLE nearby
ADD CONSTRAINT fk_nearby_recommended_placeid
FOREIGN KEY (recommended) REFERENCES restaurants (place_id);


ALTER TABLE photos
ADD CONSTRAINT fk_photos_placeid_placeid
FOREIGN KEY (place_id) REFERENCES restaurants (place_id);


CREATE INDEX index_nearby_recommended
ON nearby (recommended);

CREATE INDEX index_nearby_placeid 
ON nearby (place_id);

CREATE INDEX index_photos_placeid 
ON photos (place_id);


-- Create index command
-- 'CREATE INDEX index_nearby_recommended ON nearby (recommended); CREATE INDEX index_nearby_placeid  ON nearby (place_id); CREATE INDEX index_photos_placeid  ON photos (place_id);'

-- Add foreign key command
-- 'ALTER TABLE nearby ADD CONSTRAINT fk_nearby_placeid_placeid FOREIGN KEY (place_id) REFERENCES restaurants (place_id); ALTER TABLE nearby ADD CONSTRAINT fk_nearby_recommended_placeid FOREIGN KEY (recommended) REFERENCES restaurants (place_id); ALTER TABLE photos ADD CONSTRAINT fk_photos_placeid_placeid FOREIGN KEY (place_id) REFERENCES restaurants (place_id);'


-- Query command
-- SELECT * FROM restaurants INNER JOIN nearby ON restaurants.place_id = nearby.recommended INNER JOIN photos on photos.place_id = nearby.recommended WHERE nearby.place_id = 1;