import React from "react";
import "../styles/components/TripCreation.scss";
import cx from "classnames";
import { AddIndivCommentContainer } from "../containers/SuggestionInputFinalContainer.js";

class Comments extends React.Component {
  render() {
    const comments = this.props.comments;
    const suggestionId = this.props.suggestionId;
    const commentObj = comments.filter(
      comment => comment.suggestion_id === suggestionId
    );

    const commentsOpen = cx("comments", {
      "tab-open": this.props.tabOpen,
      "tab-closed": !this.props.tabOpen
    });

    return (
      <ul>
        <AddIndivCommentContainer />

        {commentObj.length > 0 && (
          <React.Fragment>
            <p onClick={event => this.props.setTabOpen()}>
              Comments {commentObj.length}
            </p>
            {commentObj.map(comment => {
              return (
                <React.Fragment key={comment.id}>
                  <section className={commentsOpen}>
                    <li>
                      {comment.comment}
                      {comment.first_name}
                    </li>
                  </section>
                </React.Fragment>
              );
            })}
          </React.Fragment>
        )}
      </ul>
    );
  }
}

export default Comments;
