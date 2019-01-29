import React from "react";
import "../styles/components/Comments.scss";
import cx from "classnames";
import AddIndivCommentContainer from "../containers/AddIndivCommentContainer.js";

class Comments extends React.Component {
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

  render() {
    const comments = this.props.comments;
    const suggestionId = this.props.suggestion;
    const commentObj = comments.filter(
      comment => comment.suggestion_id === suggestionId.id
    );
    const commentsArr = commentObj.slice(1);
    const commentsNumber = commentObj.length - 1;

    const commentsOpen = cx("viewcomments__controls", {
      "tab--open": this.state.clickedstate,
      "tab--closed": !this.state.clickedstate
    });

    return (
      <React.Fragment>
        {commentObj.length > 0 && (
          <section className="viewcomments">
            <p className="viewcomments__first">
              <em>{commentObj[0].comment}</em>
            </p>

            <button
              className="viewcomments__btn"
              value={this.props.suggestion.id}
              onClick={event => {
                this.state.clickedstate
                  ? this.removeClicked(event.target.value)
                  : this.addClicked(event.target.value);
              }}
            >
              {commentsNumber > 0
                ? `Comments (${commentsNumber})`
                : `Comment +`}
            </button>

            <div className={commentsOpen}>
              <ul className="viewcomments__list menu--settings">
                {commentsArr.map(comment => {
                  return (
                    <li key={comment.id} className="viewcomments__item">
                      <em>{comment.comment}</em>
                      <span>&nbsp;&ndash;&nbsp;{comment.first_name}</span>
                    </li>
                  );
                })}
              </ul>
              <AddIndivCommentContainer
                suggestionId={suggestionId}
                tripId={this.props.tripId}
                suggestion={this.props.suggestion}
              />
            </div>

            {/* LIKES OUTPUT - USER INTIAL OF LIKER */}

            <section className="viewcomments__likes">
              {this.props.tripLike.map(initial => (
                <ul
                  key={initial.id}
                  className="viewcomments__likeslist menu--settings"
                >
                  <li className="viewcomments__likesitem">
                    {initial.first_name.charAt(0).toUpperCase()}
                  </li>
                  {/* <li className="viewcomments__likesitem">C</li>
                  <li className="viewcomments__likesitem">P</li>
                  <li className="viewcomments__likesitem">T</li>
                  <li className="viewcomments__likesitem">M</li> */}
                </ul>
              ))}
            </section>
          </section>
        )}
      </React.Fragment>
    );
  }
}

export default Comments;
