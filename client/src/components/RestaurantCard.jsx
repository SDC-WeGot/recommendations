import React from 'react';
import RestaurantDetails from './RestaurantDetails.jsx'
import PhotoCarousel from './PhotoCarousel.jsx'

class RestaurantCard extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const {restaurant} = this.props;
    return(
      <div className="restaurant-card" onClick={this.props.switchRestaurant.bind(this,restaurant.place_id)}>
        <PhotoCarousel photos={restaurant.photos} />
        <RestaurantDetails restaurant={restaurant} />
      </div>
    )
  }
}

export default RestaurantCard;

// <div className="restaurant-card" onClick={(e) => this.props.switchRestaurant(restaurant.place_id,e)}>
