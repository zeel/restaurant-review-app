import React from 'react';
import ReactDOM from 'react-dom';
import {
  withRouter,
  Link
} from 'react-router-dom';
import GoogleMapLoader from "react-google-maps-loader";
import {
  findNearyByRestaurants
} from '../../../utils/location';
import RestaurantSearch from '../../molecules/RestaurantSearch';
import StarComponent from 'react-star-rating-component';
import {
  GOOGLE_APP_KEY
} from '../../../constants/keys';
import './restaurants.css';

const libraries = ["places"];
class Restaurants extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoding: true,
      results: [],
    }
  }

  componentDidMount() {
    this.fetchRestaurants(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.placeId !== nextProps.match.params.placeId || nextProps.location.search !== this.props.location.search) {
      this.fetchRestaurants(nextProps);
    }
  }

  fetchRestaurants = (props = this.props) => {
    const searchParams = new URLSearchParams(props.location.search);
    findNearyByRestaurants(props.googleMaps, props.match.params.placeId, ReactDOM.findDOMNode(this.mapNode), searchParams.get("q")).then((results) => {
      this.setState({
        results,
        isLoading: false,
      })
    });
  }

  renderRestaurantCard = (restaurant) => {
    return (<div className="card card-outline-secondary mb-3 text-center" key={restaurant.place_id}>
      <div className="card-block">
        <div>
          <Link to={`/restaurants/${restaurant.place_id}`}>{restaurant.name}</Link>
          <div className="star-rating">
            <StarComponent
              starCount={5}
              value={Number(restaurant.rating)}
              editing={false}
              name="User Rating"
            />
          </div>
        </div>
        <footer>{restaurant.vicinity}</footer>
      </div>
    </div>);
  }

  render() {
    const restaurantNode = this.state.results.map(this.renderRestaurantCard)
    return (
      <section className="restaurants-container">
        <RestaurantSearch placeId={this.props.match.params.placeId} />
        <div ref={(ref) => this.mapNode = ref}></div>
        <div className="restaurants-list">
          {restaurantNode}
        </div>
      </section>
    );
  }

}

export default withRouter(GoogleMapLoader(Restaurants, {
  libraries,
  key: GOOGLE_APP_KEY,
}));