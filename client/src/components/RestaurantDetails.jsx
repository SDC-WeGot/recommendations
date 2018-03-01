import React from 'react';

const RestaurantDetails = (props) => {
  const {restaurant} = props;

  var numDollarSign = (priceLevel) => {
    var dollarSigns = '';
    for(var i = 0; i < priceLevel; i++){
      dollarSigns += '$';
    }
    return dollarSigns;
  }

  var starsPercentage = (googleRating) => {
    var percent = googleRating / 5 * 100;
    return percent + '%';
  }

  return(
    <div className="restaurant-details">
      <div className="details-title">{restaurant.name}</div>
      <div className="details-tags">{restaurant.types[0]} · {restaurant.neighborhood} · {numDollarSign(restaurant.price_level)}</div>
      <div className="details-ratings">
        <img src="/zagat-logo-icon.png" className="zagat-rating-icon"></img><span className="zagat-rating">Food </span><span className="zagat-rating-value">{restaurant.zagat_food_rating}</span><div className="rating-divider"></div>
        <img src="/google-logo-icon.png" className="google-rating-icon"></img><span className="google-rating-value">{restaurant.google_rating}</span>
        <div className="google-rating-stars">
          <div className="star-ratings-top" style={{width : starsPercentage(restaurant.google_rating)}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
          <div className="star-ratings-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
        </div>
        <span className="google-rating-count">({restaurant.review_count})</span>
      </div>
      <div className="details-description">{restaurant.short_description}.</div>
    </div>
  )
}

export default RestaurantDetails;
