import React from 'react';
import ReactDOM  from 'react-dom';
import RestaurantCard from './components/RestaurantCard.jsx'
import $ from 'jquery';

const Restaurants = [
  {
    "name": "Clift San Francisco",
    "place_id": "ChIJFUBxSY6AhYARwOaLV7TsLjw",
    "google_rating": 4.5,
    "zagat_food_rating": 4.2,
    "review_count": 5,
    "photos": ['https://lh3.ggpht.com/p/AF1QipOmG5kSEr7yGQ2I_n6ndK9BLWeBR5PHiGzgAL0c=s224-c-v1-rj','https://lh3.ggpht.com/p/AF1QipNwMDHKJN6Q3Ki_r5BMQlxxlRydIBaVrBB1Kn2E=s224-c-v1-rj','https://lh3.ggpht.com/p/AF1QipN_uh48A1uuotg0zLYLZarrE_bwgMKqqk5VRROY=s224-c-v1-rj','https://lh3.ggpht.com/p/AF1QipPEDQ6Zo_inisz8htJBszIiHvZPghOg7ofTsKZa=s224-c-v1-rj','https://lh3.ggpht.com/p/AF1QipPUpYmXveAKLJAMBy6iW53osNVBgxfueaTFD_Hp=s224-c-v1-rj'],
    "short_description": "sint ut sint Cupidatat pork sint sint belly boudin sint boudin",
    "neighborhood": "Tenderloin",
    "location": {"lat": 37.7867167, "long": -122.4111737},
    "price_level": 4,
    "types": [
        "night_club",
        "bar",
        "lodging",
        "restaurant",
        "food",
        "point_of_interest",
        "establishment"
    ]
  },
  {name: 'Maven', photos: ['https://lh3.googleusercontent.com/p/AF1QipNR6KcJVNb3PKTpeli7dIZEOzFqs3ntcWug-U8Q=s1600-w400', 'https://lh3.ggpht.com/p/AF1QipNoMRZwGYU_wB9hp9AQXLlFL5Fx-phGRyX3kAg_=s224-c-v1-rj', 'https://lh3.ggpht.com/p/AF1QipNrd_l95_GAu4NjXMo8lvafHxAtvoHLjjXVbfxf=s224-c-v1-rj'],"types": ["restaurant", 'bar']},
  {name: 'A', photos: ['https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=CmRaAAAAE8YjexvHpiRQ647tDPIHhjSFzBzR3_1j5i8dLwU0dRfv3aakrkvq4XfM3RBEcm9w5Xw6s_g7pC5ZfSPNXa_VEFhVUrRXpNorxeARj63DpI-9-J0lpKs-LY9q0827uCXhEhCNMlrjgmNlwANGvRpOehCSGhTp6VV4zVvLTtJoY9bZQ4SpK3zyYw&key=AIzaSyBpgTvaNaG7gsuagiuSYWfL-4d5gluLOnE', 'https://lh3.ggpht.com/p/AF1QipNoMRZwGYU_wB9hp9AQXLlFL5Fx-phGRyX3kAg_=s224-c-v1-rj'],"types": ["restaurant", 'bar']},
  {name: 'B', photos: ['https://lh3.googleusercontent.com/p/AF1QipNR6KcJVNb3PKTpeli7dIZEOzFqs3ntcWug-U8Q=s1600-w400', 'https://lh3.ggpht.com/p/AF1QipNoMRZwGYU_wB9hp9AQXLlFL5Fx-phGRyX3kAg_=s224-c-v1-rj'],"types": ["restaurant", 'bar']},
  {name: 'C', photos: ['https://lh3.googleusercontent.com/p/AF1QipNR6KcJVNb3PKTpeli7dIZEOzFqs3ntcWug-U8Q=s1600-w400', 'https://lh3.ggpht.com/p/AF1QipNoMRZwGYU_wB9hp9AQXLlFL5Fx-phGRyX3kAg_=s224-c-v1-rj'],"types": ["restaurant", 'bar']},
  {name: 'D', photos: ['https://lh3.googleusercontent.com/p/AF1QipNR6KcJVNb3PKTpeli7dIZEOzFqs3ntcWug-U8Q=s1600-w400', 'https://lh3.ggpht.com/p/AF1QipNoMRZwGYU_wB9hp9AQXLlFL5Fx-phGRyX3kAg_=s224-c-v1-rj'],"types": ["restaurant", 'bar']},
];

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
      url: '/api/restaurants/ChIJFUBxSY6AhYARwOaLV7TsLjw',
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
    // url = url.split('?');
    // if (url.length > 1) {
    //   var urlParams = url[1].split('&');
    //   urlParams = urlParams.reduce((acc, param) => {
    //     param = param.split('=');
    //     acc[param[0]] = param[1];
    //     return acc;
    //   }, {id: url[0]});
    // }
    // console.log(urlParams);

    $.ajax({
      url: `/api/restaurants/${id}`,
      method: 'GET',
      // dataType: 'application/json',
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

  render(){
    return(
      <div className="recommendations-container">

        {this.state.recommended.map((restaurant, index) => (
          <RestaurantCard restaurant={restaurant} key={index} />
        ))}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
