import React from 'react';
import ReactDOM  from 'react-dom';
import RestaurantCard from './components/RestaurantCard.jsx'
import $ from 'jquery';
import '../dist/styles.css';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      recommended: [],
      restaurant: null
    }
  }

  componentDidMount(){
    this.getRecommendedRestaurants();
  }

  getRecommendedRestaurants(){
    // console.log(window.location.href);
    var id = window.location.href.split('/')[4];
    console.log('getting recommended restaurants for id: ' + id)

    $.ajax({
      url: `/api/restaurants/${id}/recommendations`,
      method: 'GET',
      success: (data) => {
        console.log('get success from client!', data);
        if (!Array.isArray(data)) {
          this.repackageData(JSON.parse(data));          
        } else {
          console.log('data = ', data);
          this.repackageData(data);
        }
      },
      error: (data) => {
        console.log('get error from client!', data);
      }
    })
  }

  goToRestaurant(id){
    console.log('go to restaurant ' + id)
    location.href = '/restaurants/' + id;
  }

  repackageData(postgresData) {
    let recommendedRestaurants = [];
    while (recommendedRestaurants.length < 6) {
      let restaurantObjectSeed = postgresData[((recommendedRestaurants.length + 1) * 10)];
      restaurantObjectSeed.photos = [];
      for (var i = 0; i < 10; i++) {
        restaurantObjectSeed.photos.push(postgresData[i + (recommendedRestaurants.length * 10)].photo_url);
        if (restaurantObjectSeed.photos.length === 10) {
          recommendedRestaurants.push(restaurantObjectSeed);
        }
      }
    }
    console.table(recommendedRestaurants);
    this.setState({
      restaurant: postgresData[0],
      recommended: recommendedRestaurants,
    });
  }

  render(){
    return(
      <div>
        <div className="recommendations-title">More Restaurants Near {this.state.restaurant ? this.state.restaurant.business_name.toUpperCase() : '...'}</div>
        <div className="recommendations-container">
          {this.state.recommended.map((restaurant, index) => (
            <RestaurantCard restaurant={restaurant} key={index} switchRestaurant={this.goToRestaurant.bind(this)}/>
          ))}
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('recommendations-app'));
