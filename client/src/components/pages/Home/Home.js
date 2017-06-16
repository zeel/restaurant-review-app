import React from 'react';
import ReactDOM from 'react-dom';
import {
  withRouter
} from 'react-router-dom';
import _get from 'lodash/get';
import {
  connect
} from 'react-redux';
import {
  getUserLocation
} from '../../../actions/userActions';
import {
  findNearByPlaces
} from '../../../utils/location';
import {
  GOOGLE_APP_KEY
} from '../../../constants/keys';
import GoogleMapLoader from 'react-google-maps-loader';
import RestaurantSearch from '../../molecules/RestaurantSearch';
import './home.css';
const libraries = ["places"];

class Home extends React.PureComponent {
  state = {}

  componentDidMount() {
    this.props.getUserLocation();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      const {
        googleMaps
      } = nextProps
      findNearByPlaces({
        googleMaps,
        location: {
          lat: nextProps.location.latitude,
          lng: nextProps.location.longitude,
        },
        mapNode: ReactDOM.findDOMNode(this.mapNode),
        radius: 2000
      }).then((results) => {
        this.setState({
          placeId: _get(results, '0.place_id')
        })
      })
    }
  }

  render() {
    const placeId = this.state.placeId;
    return (
      <div className="jumbotron jumbotron-fluid home-container">
        <div className="container">
          <h1 className="display-5 text-center mb-5">Find restaurants in your area</h1>
          <RestaurantSearch placeId={placeId} />
        </div>
        <div ref={(ref) => this.mapNode = ref}></div>
      </div>
    );
  }
}

export default withRouter(connect(({
  user
}) => ({
  location: user.location
}), {
  getUserLocation,
})(GoogleMapLoader(Home, {
  libraries,
  key: GOOGLE_APP_KEY,
})));