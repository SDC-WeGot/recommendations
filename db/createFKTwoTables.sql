ALTER TABLE nearby
ADD CONSTRAINT fk_nearby_placeid
FOREIGN KEY (place_id) REFERENCES restaurants (place_id);

ALTER TABLE nearby
ADD CONSTRAINT fk_nearby_recommended_placeid
FOREIGN KEY (recommended) REFERENCES restaurants (place_id);

-- 'ALTER TABLE nearby ADD CONSTRAINT nearby_placeid_placeid FOREIGN KEY (place_id) REFERENCES restaurants (place_id); ALTER TABLE nearby ADD CONSTRAINT nearby_recommended_placeid FOREIGN KEY (recommended) REFERENCES restaurants (place_id);'

-- need to go back and remove constraints, readd foreign key constraints