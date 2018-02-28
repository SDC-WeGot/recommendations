import React from 'react';

class PhotoCarousel extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="photo-carousel">
        <img src="https://lh3.googleusercontent.com/p/AF1QipNR6KcJVNb3PKTpeli7dIZEOzFqs3ntcWug-U8Q=s1600-w400" className="restaurant-photos"></img>
      </div>
    )
  }
}

export default PhotoCarousel;
