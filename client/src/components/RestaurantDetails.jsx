import React from 'react';

class RestaurantDetails extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const {restaurant} = this.props;

    return(
      <div className="restaurant-details">
        <div className="details-title">{restaurant.name}</div>
        <div className="details-tags">Californian · Lower Haight · $$</div>
        <div className="details-ratings">
          <img src="/zagat-logo-icon.png" className="zagat-rating-icon"></img><span className="zagat-rating">Food </span><span className="zagat-rating-value">4.3</span><div className="rating-divider"></div>
          <img src="/google-logo-icon.png" className="google-rating-icon"></img><span className="google-rating-value">4.3</span>
          <div className="google-rating-stars">
            <div className="star-ratings-top" style={{width:'85%'}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
            <div className="star-ratings-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
          </div>
          <span className="google-rating-count">(68)</span>
        </div>
        <div className="details-description">Small plates and creative drinks in a modern setting with wall-mounted plants & polished log.</div>
      </div>
    )
  }
}

export default RestaurantDetails;
