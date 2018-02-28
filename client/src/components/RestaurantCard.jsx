import React from 'react';
import RestaurantDetails from './RestaurantDetails.jsx'
import PhotoCarousel from './PhotoCarousel.jsx'

class RestaurantCard extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="restaurant-card">
        <PhotoCarousel />
        <RestaurantDetails />

      </div>
    )
  }
}

export default RestaurantCard;
