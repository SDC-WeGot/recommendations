SELECT * FROM restaurants INNER JOIN nearby ON restaurants.place_id = nearby.recommended WHERE nearby.place_id = 1;
-- don't use *, be specific with fields- restaurants.longitude

SELECT * FROM restaurants INNER JOIN nearby ON restaurants.place_id = nearby.recommended INNER JOIN photos on photos.place_id = nearby.recommended WHERE nearby.place_id = 1;