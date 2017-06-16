import React from 'react';
import ReactDOM from 'react-dom';
import {
  connect
} from 'react-redux';
import {
  withRouter
} from 'react-router-dom';
import GoogleMapLoader from "react-google-maps-loader";
import {
  Button
}
from 'react-bootstrap';
import {
  fetchReviews,
  createReview
} from '../../../actions/reviewActions';
import {
  getLocationDetails
} from '../../../utils/location';
import RestaurantSearch from '../../molecules/RestaurantSearch';
import ReviewItem from '../../molecules/ReviewItem';
import {
  GOOGLE_APP_KEY
} from '../../../constants/keys';
import './restaurant.css';
const libraries = ["places"],
  adaptGoogleReviews = (review, index) => ({
    ...review,
    _id: index,
    createdAt: review.time,
  });
class Home extends React.PureComponent {

  state = {
    result: {},
    review: {}
  };

  componentDidMount() {
    const props = this.props,
      placeId = props.match.params.placeId;

    props.fetchReviews(placeId);
    getLocationDetails(props.googleMaps, placeId, ReactDOM.findDOMNode(this.mapNode)).then((result) => {
      this.setState({
        result,
        isLoading: false,
      });
    })
  }

  toggleCreateReview = () => {
    this.setState({
      showCreateMode: !this.state.showCreateMode
    });
  }

  createReview = () => {
    const {
      state,
    } = this,
    review = state.review;
    if (review.text || review.rating) {
      this.props.createReview({
        ...review,
        placeId: this.props.match.params.placeId
      });
      this.resetEditor();
    } else {
      this.setState({
        hasError: true,
      })
    }
  }

  resetEditor = () => {
    this.setState({
      showCreateMode: false,
      review: {},
      hasError: false,
    });
  }

  onReviewUpdate = (review) => {
    this.setState({
      review
    });
  }

  renderRestaurantDetails(result) {
    return (<div className="mt-5">
      <h1>{result.name}</h1>
      <div>{result.formatted_address}</div>
      <div>{result.formatted_phone_number}</div>
    </div>);
  }

  renderCreateReview() {
    const {
      state: {
        review,
        hasError
      }
    } = this;
    return (
      <div>
        <ReviewItem
          review={review}
          onUpdate={this.onReviewUpdate}
          isEditMode
          hasError={hasError}
        />
        <div className="mt-2">
          <Button
          bsStyle="default"
          onClick={this.createReview}
        >
          Create Review
        </Button>
        <Button
          bsStyle="link"
          onClick={this.resetEditor}
        >
          Cancel
        </Button>
        </div>
      </div>);
  }

  renderViewReview(review) {
    return (<ReviewItem
      review={review}
      key={review._id}
    />);
  }

  render() {
    const {
      state: {
        result,
        showCreateMode,
      },
      props
    } = this,
    reviewNodes = (result.reviews || []).map(adaptGoogleReviews).concat(props.reviews).map(this.renderViewReview);

    return (
      <section className="restaurants-container">
        <RestaurantSearch placeId={this.props.match.params.placeId} />
        <div ref={(ref) => this.mapNode = ref}></div>
        {this.renderRestaurantDetails(result)}
        <div className="mt-3">
          { showCreateMode ? this.renderCreateReview() : (<Button
          bsStyle="default"
          onClick={this.toggleCreateReview}
        >
          Write a Review
        </Button>)}
        </div>
        <h5 className="mt-4">Reviews for {result.name}</h5>
        {reviewNodes}
      </section>
    );
  }
}

export default withRouter(connect(
  ({
    review,
  }) => review, {
    fetchReviews,
    createReview,
  }
)(GoogleMapLoader(Home, {
  libraries,
  key: GOOGLE_APP_KEY,
})));