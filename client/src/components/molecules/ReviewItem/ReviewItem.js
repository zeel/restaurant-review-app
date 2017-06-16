import React from 'react';
import PropTypes from 'prop-types';
import StarComponent from 'react-star-rating-component';
import TextInput from 'react-textarea-autosize';
import moment from 'moment';
import './reviewItem.css';
const DEFAULT_PROFILE_IMG = 'https://www.grmep.org/wp-content/themes/grmep-theme/images/default-user-img.jpg';
class ReviewItem extends React.PureComponent {
  static propTypes = {
    review: PropTypes.object,
    isEditMode: PropTypes.bool,
    onUpdate: PropTypes.func,
    hasError: PropTypes.bool,
  };

  static defaultProps = {
    isEditMode: false,
  };

  onStarClick = (rating) => {
    this.props.onUpdate({
      ...this.props.review,
      rating,
    });
  }

  onTextChange = (e) => {
    this.props.onUpdate({
      ...this.props.review,
      text: e.target.value,
    });
  }

  render() {
    const {
      review,
      isEditMode,
      hasError,
    } = this.props;

    return (
      <div className="card card-outline-secondary mt-3">
        <div className="card-block">
          <div className="review-item mb-3">
            <div className="review-item__user">
              <img className="review-item__user-image" src={review.profile_photo_url || DEFAULT_PROFILE_IMG} alt="User"/>
              <span className="review-item__user-name">{review.author_name}</span>
            </div>
            <div className="review-item__rating">
              <StarComponent
                starCount={5}
                value={review.rating}
                editing={isEditMode}
                name="User Rating"
                onStarClick={this.onStarClick}
              />
              <span className="ml-2">{moment(review.createdAt).format('MMM DD, YYYY hh:mm a')}</span>
            </div>
          </div>
          {isEditMode ? (
            <div className={`form-group ${hasError ? 'has-danger' : ''}`}>
              <TextInput
                className = {`text-editor form-control mr-3 ${hasError ? 'form-control-danger' : ''}`}
                onChange={this.onTextChange}
                value={review.text}
                placeholder="Write your review"
              />
              {hasError && <div className="form-control-feedback">Please fill the form</div>}
          </div>) : review.text}
        </div>
      </div>
    );
  }
}

export default ReviewItem;