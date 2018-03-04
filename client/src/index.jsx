import React from 'react';
import ReactDOM  from 'react-dom';
import RestaurantCard from './components/RestaurantCard.jsx'
import $ from 'jquery';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      recommended: [],
    }
  }

  componentDidMount(){
    this.getRecommendedRestaurants();
    // this.fetch();
  }

  fetch(){
    console.log('fetching');
    $.ajax({
      url: '/api/restaurants',
      method: 'GET',
      contentType: 'application/json',
      success: (data) => {
        console.log('Get Success:', data);
        this.setState({
          recommended: data,
        },
        () => console.log('fetched'))
      },
      error: (data) => {
        console.log('Get Error:', data);
      }
    });
  }

  getRecommendedRestaurants(){
    console.log('getting recommended restaurants')
    // console.log(window.location.href);
    var id = window.location.href.split('/').pop();
    console.log(id)

    $.ajax({
      url: `/api/restaurants/${id}`,
      method: 'GET',
      success: (data) => {
        console.log('get success from client!', data);
        this.setState({
          recommended: data,
        },
        () => console.log('fetched'))
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

  render(){
    return(
      <div className="recommendations-container">

        {this.state.recommended.map((restaurant, index) => (
          <RestaurantCard restaurant={restaurant} key={index} switchRestaurant={this.goToRestaurant.bind(this)}/>
        ))}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
