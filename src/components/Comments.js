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

    const commentsOpen = cx("viewcomments__controls", {
      "tab--open": this.props.clicked,
      "tab--closed": !this.props.clicked
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
              {commentsNumber > 0
                ? `Comments (${commentsNumber})`
                : `Add a comment`}
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
          </section>
        )}
      </React.Fragment>
    );
  }
}

export default Comments;
