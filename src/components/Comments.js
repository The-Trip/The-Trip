import React from "react";
import "../styles/components/TripCreation.scss";
import cx from "classnames";
import AddIndivCommentContainer from "../containers/AddIndivCommentContainer.js";

class Comments extends React.Component {
  render() {
    const comments = this.props.comments;
    const suggestionId = this.props.suggestion;
    const commentObj = comments.filter(
      comment => comment.suggestion_id === suggestionId.id
    );

    const commentsOpen = cx("viewcomments__item", {
      "tab-open": this.props.clicked,
      "tab-closed": !this.props.clicked
    });

    return (
      <React.Fragment>
        <AddIndivCommentContainer
          suggestionId={suggestionId}
          tripId={this.props.tripId}
          suggestion={this.props.suggestion}
        />

        {commentObj.length > 0 && (
          <section className="viewcomments">
            <button
              className="viewcomments__btn"
              onClick={event => {
                this.props.clicked
                  ? this.props.removeClickedClass()
                  : this.props.addClickedClass();
              }}
            >
              Comments {commentObj.length}
            </button>

            <ul className="viewcomments__list">
              {commentObj.map(comment => {
                return (
                  <li key={comment.id} className={commentsOpen}>
                    {comment.comment}
                    {comment.first_name}
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </React.Fragment>
    );
  }
}

export default Comments;
