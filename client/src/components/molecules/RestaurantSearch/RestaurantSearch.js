import React, {
  Component
} from "react";
import _get from 'lodash/get';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {
  Button
}
from 'react-bootstrap';
import Select from 'react-select';
import {
  withRouter
} from 'react-router-dom';
import {
  findNearyByRestaurants,
  getLocationDetails
} from '../../../utils/location';

import GoogleMapLoader from 'react-google-maps-loader';
import GooglePlacesSuggest from 'react-google-places-suggest';

import {
  GOOGLE_APP_KEY
} from '../../../constants/keys';
import './restaurantSearch.css';
import "react-google-places-suggest/lib/index.css";

const libraries = ["places"];
class RestaurantSearch extends Component {
  static propTypes = {
    value: PropTypes.string,
    className: PropTypes.string,
    containerClass: PropTypes.string,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    placeId: PropTypes.string,
  };

  static defaultProps = {
    containerClass: '',
    className: '',
    onChange: () => {},
    onClick: () => {},
    onSuggestSelect: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.placeId !== this.props.placeId) {
      nextProps.placeId && this.setLocationLabel(nextProps);
    }

  }

  componentDidMount() {
    const placeId = this.props.placeId;
    placeId && this.setLocationLabel();
  }

  setLocationLabel = (props = this.props) => {
    getLocationDetails(props.googleMaps, props.placeId, ReactDOM.findDOMNode(this.mapNode)).then((result) => {
      this.setState({
        defaultLocationLabel: result.name,
        placeId: props.placeId
      })
    });
  }

  handleSearchChange = (e) => {
    this.setState({
      search: e.target.value,
      defaultLocationLabel: '',
    })
  }

  handleSelectSuggest = (suggest, coordinate) => {
    this.setState({
      placeId: suggest.place_id,
      search: suggest.description,
    })
  }

  loadRestaurantOptions = input => {
    const {
      props,
      state
    } = this;
    return findNearyByRestaurants(props.googleMaps, state.placeId, ReactDOM.findDOMNode(this.mapNode))
      .then(data => ({
        options: data,
      }));

  };

  onClick = () => {
    const query = this.state.query ? `?q=${this.state.query}` : '';
    this.props.history.push(`/restaurants/search/${this.state.placeId}${query}`);
  }

  onChange = (option) => {
    this.setState({
      query: _get(option, 'label'),
      queryValue: _get(option, 'value')
    })
  }

  render() {
    const {
      props,
      state
    } = this;
    const {
      search,
      defaultLocationLabel
    } = this.state
    const {
      googleMaps
    } = props

    return (
      <div className={`${props.containerClass} search-container`}>
        <div ref={(ref) => this.mapNode = ref}></div>
        <div className="place-container">
          <GooglePlacesSuggest
            googleMaps={googleMaps}
            onSelectSuggest={this.handleSelectSuggest}
            search={search}
            selectedLabel="test"
          >
            <input
              autoFocus
              className="form-control"
              type="text"
              value={search || defaultLocationLabel || ''}
              placeholder="Search a location"
              onChange={this.handleSearchChange}
            />
          </GooglePlacesSuggest>
        </div>
        <Select.Async
            value={state.queryValue}
            loadOptions={this.loadRestaurantOptions}
            onChange={this.onChange}
            autoload={false}
            placeholder="Start typing to search for a restaurant"
          />
          <Button
            bsStyle="primary"
            onClick={this.onClick}
          >
            Search
          </Button>
      </div>
    )
  }
}

export default withRouter(GoogleMapLoader(RestaurantSearch, {
  libraries,
  key: GOOGLE_APP_KEY,
}));