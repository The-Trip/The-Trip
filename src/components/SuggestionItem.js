import React from "react";
import "../styles/components/SuggestionItem.scss";
import CommentsContainer from "../containers/CommentsContainer";

class SuggestionItem extends React.Component {
  constructor() {
    super();
    this.state = {
      clickedstate: false
    };
    this.removeClicked = this.removeClicked.bind(this);
    this.addClicked = this.addClicked.bind(this);
  }

  addClicked(id) {
    this.setState({ clickedstate: true });
  }

  removeClicked(id) {
    this.setState({ clickedstate: false });
  }

  // function SuggestionItem({
  //   suggestion,
  //   tripId,
  //   addLike,
  //   removeLike,
  //   clickedLike,
  //   tripLike,
  //   removeFavourites,
  //   addFavourites,
  //   clickedFav
  // })

  // const likes = tripLike ? tripLike : null;
  render() {
    return (
      <article className="suggestion">
        <header className="suggestion__header container">
          <div className="suggestion__likeswrap">
            <h2 className="suggestion__title">
              {this.props.suggestion.place_name}
              <div className="suggestion__details">
                {this.props.suggestion.place_category}
                <span>
                  &nbsp;Suggested by&nbsp;
                  {this.props.suggestion.first_name}
                </span>
              </div>
              {/* <div key={likes ? likes.id : 0}>{likes ? likes.length : 0}</div> */}
              <div key={this.props.tripLike ? this.props.tripLike.id : 0}>
                {this.props.tripLike ? this.props.tripLike.length : 0}
              </div>
            </h2>
            <button
              className="suggestion__favouritesbtn"
              onClick={() => {
                this.clickedFav
                  ? this.props.removeFavourites(
                      this.props.suggestion.id,
                      this.props.tripId
                    )
                  : this.props.addFavourites(
                      this.props.suggestion.id,
                      this.props.tripId
                    );
              }}
            />
            <button
              className="suggestion__likebtn"
              onClick={() => {
                clickedLike
                  ? this.props.removeLike(
                      this.props.suggestion.id,
                      this.props.tripId
                    )
                  : this.props.addLike(
                      this.props.suggestion.id,
                      this.props.tripId
                    );
              }}
            >
              <i className="fas fa-heart fa-lg" />
            </button>
          </div>
        </header>
        <div className="suggestion__body container">
          {this.props.suggestion.photo && (
            <figure
              className="suggestion__figure"
              style={{
                backgroundImage: `url(/api/google-photo/${
                  this.props.suggestion.photo
                }`
              }}
            />
          )}

          <p className="suggestion__address">
            {this.props.suggestion.place_address}
          </p>

          <CommentsContainer
            key={this.props.suggestion.id}
            suggestion={this.props.suggestion}
            tripId={this.props.tripId}
          />
        </div>
      </article>
    );
  }
}

export default SuggestionItem;
