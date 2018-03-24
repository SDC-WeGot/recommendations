ALTER TABLE nearby
ADD CONSTRAINT fk_nearby_placeid_placeid
FOREIGN KEY (place_id) REFERENCES restaurants (place_id);

ALTER TABLE nearby
ADD CONSTRAINT fk_nearby_recommended_placeid
FOREIGN KEY (recommended) REFERENCES restaurants (place_id);


ALTER TABLE photos
ADD CONSTRAINT fk_photos_placeid_placeid
FOREIGN KEY (place_id) REFERENCES restaurants (place_id);

-- 'ALTER TABLE nearby ADD CONSTRAINT fk_nearby_placeid_placeid FOREIGN KEY (place_id) REFERENCES restaurants (place_id); ALTER TABLE nearby ADD CONSTRAINT fk_nearby_recommended_placeid FOREIGN KEY (recommended) REFERENCES restaurants (place_id); ALTER TABLE photos ADD CONSTRAINT fk_photos_placeid_placeid FOREIGN KEY (place_id) REFERENCES restaurants (place_id);'

