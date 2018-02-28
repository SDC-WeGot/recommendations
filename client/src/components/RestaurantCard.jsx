import React from 'react';
import RestaurantDetails from './RestaurantDetails.jsx'

class RestaurantCard extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="restaurant-card">
        <div className="photo-carousel">
        </div>
        <RestaurantDetails />

      </div>
    )
  }
}

export default RestaurantCard;
