import React from "react";
import "../styles/components/Comments.scss";
import cx from "classnames";
import AddIndivCommentContainer from "../containers/AddIndivCommentContainer.js";

class Comments extends React.Component {
  render() {
    const comments = this.props.comments;
    const suggestionId = this.props.suggestion;
    const commentObj = comments.filter(
      comment => comment.suggestion_id === suggestionId.id
    );
    const commentsArr = commentObj.slice(1);
    const commentsNumber = commentObj.length - 1;

    const commentsOpen = cx("viewcomments__list menu--settings", {
      "tab-open": this.props.clicked,
      "tab-closed": !this.props.clicked
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
              onClick={event => {
                this.props.clicked
                  ? this.props.removeClickedClass()
                  : this.props.addClickedClass();
              }}
            >
              Comments {`(${commentsNumber})`}
            </button>

            <ul className={commentsOpen}>
              {commentsArr.map(comment => {
                return (
                  <li key={comment.id} className="viewcomments__item">
                    {comment.comment}
                    <span>{comment.first_name}</span>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <AddIndivCommentContainer
          suggestionId={suggestionId}
          tripId={this.props.tripId}
          suggestion={this.props.suggestion}
        />
      </React.Fragment>
    );
  }
}

export default Comments;
