ALTER TABLE nearby
ADD CONSTRAINT fk_nearby_placeid
FOREIGN KEY (place_id) REFERENCES restaurants (place_id);

ALTER TABLE nearby
ADD CONSTRAINT fk_nearby_recommended_placeid
FOREIGN KEY (recommended) REFERENCES restaurants (place_id);


CREATE INDEX index_nearby_recommended_placeid 
ON nearby (recommended);

CREATE INDEX index_nearby_recommended_placeid 
ON nearby (place_id);



-- 'ALTER TABLE nearby ADD CONSTRAINT nearby_placeid_placeid FOREIGN KEY (place_id) REFERENCES restaurants (place_id); ALTER TABLE nearby ADD CONSTRAINT nearby_recommended_placeid FOREIGN KEY (recommended) REFERENCES restaurants (place_id);'

-- Create index command
-- 'CREATE INDEX index_nearby_recommended ON nearby (recommended); CREATE INDEX index_nearby_placeid ON nearby (place_id);'


-- Query command
-- SELECT * FROM restaurants INNER JOIN nearby ON restaurants.place_id = nearby.recommended WHERE nearby.place_id = 1;