import React from 'react';
import ReactDOM  from 'react-dom';
import RestaurantCard from './components/RestaurantCard.jsx'

class App extends React.Component{
  constructor(props){
    super(props);
  }

  render(){

    return(
      <div className="recommendations-container">
        <RestaurantCard/>
        <RestaurantCard/>
        <RestaurantCard/>
        <RestaurantCard/>
        <RestaurantCard/>
        <RestaurantCard/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
