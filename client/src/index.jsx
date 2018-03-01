import React from 'react';
import ReactDOM  from 'react-dom';
import RestaurantCard from './components/RestaurantCard.jsx'

const Restaurants = [
  {name: 'Maven', photos: ['https://lh3.googleusercontent.com/p/AF1QipNR6KcJVNb3PKTpeli7dIZEOzFqs3ntcWug-U8Q=s1600-w400', 'https://lh3.ggpht.com/p/AF1QipNoMRZwGYU_wB9hp9AQXLlFL5Fx-phGRyX3kAg_=s224-c-v1-rj', 'https://lh3.ggpht.com/p/AF1QipNrd_l95_GAu4NjXMo8lvafHxAtvoHLjjXVbfxf=s224-c-v1-rj']},
  {name: 'A', photos: ['https://lh3.googleusercontent.com/p/AF1QipNR6KcJVNb3PKTpeli7dIZEOzFqs3ntcWug-U8Q=s1600-w400', 'https://lh3.ggpht.com/p/AF1QipNoMRZwGYU_wB9hp9AQXLlFL5Fx-phGRyX3kAg_=s224-c-v1-rj']},
  {name: 'B', photos: ['https://lh3.googleusercontent.com/p/AF1QipNR6KcJVNb3PKTpeli7dIZEOzFqs3ntcWug-U8Q=s1600-w400', 'https://lh3.ggpht.com/p/AF1QipNoMRZwGYU_wB9hp9AQXLlFL5Fx-phGRyX3kAg_=s224-c-v1-rj']},
  {name: 'C', photos: ['https://lh3.googleusercontent.com/p/AF1QipNR6KcJVNb3PKTpeli7dIZEOzFqs3ntcWug-U8Q=s1600-w400', 'https://lh3.ggpht.com/p/AF1QipNoMRZwGYU_wB9hp9AQXLlFL5Fx-phGRyX3kAg_=s224-c-v1-rj']},
  {name: 'D', photos: ['https://lh3.googleusercontent.com/p/AF1QipNR6KcJVNb3PKTpeli7dIZEOzFqs3ntcWug-U8Q=s1600-w400', 'https://lh3.ggpht.com/p/AF1QipNoMRZwGYU_wB9hp9AQXLlFL5Fx-phGRyX3kAg_=s224-c-v1-rj']},
];

class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){

    return(
      <div className="recommendations-container">
        {Restaurants.map((restaurant, index) => (
          <RestaurantCard restaurant={restaurant} key={index} />
        ))}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
