import React from 'react';

class RestaurantCard extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="restaurant-card">
        <div className="photo-carousel">
        </div>
        <div className="restaurant-details">
          <span>MAVEN</span><br></br>
          <span>Californian . Lower Haight . $$</span><br></br>
          <span>Ratings</span><br></br>
          <span>Small plates and creative drinks in a modern setting with wall-mounted plants & polished log.</span>
        </div>

      </div>
    )
  }
}

export default RestaurantCard;
