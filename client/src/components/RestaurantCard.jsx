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
      <div className="restaurant-card">
        <PhotoCarousel photos={restaurant.photos} />
        <RestaurantDetails restaurant={restaurant} />
      </div>
    )
  }
}

export default RestaurantCard;
