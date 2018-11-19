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

    // state for classes
    const id = this.props.id; // array of ids
    const clicked = this.props.clicked;

    const commentsOpen = cx("viewcomments__controls", {
      "tab--open": clicked,
      "tab--closed": !clicked
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
                  ? this.props.removeClickedClass(id)
                  : this.props.addClickedClass(id);
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

            {/* LIKES OUTPUT - USER INTIAL OF LIKER */}
            <section className="viewcomments__likes">
              Suggestions
              <ul className="viewcomments__likeslist menu--settings">
                <li className="viewcomments__likesitem">M</li>
                <li className="viewcomments__likesitem">C</li>
                <li className="viewcomments__likesitem">P</li>
                <li className="viewcomments__likesitem">T</li>
                <li className="viewcomments__likesitem">M</li>
              </ul>
            </section>
          </section>
        )}
      </React.Fragment>
    );
  }
}

export default Comments;
