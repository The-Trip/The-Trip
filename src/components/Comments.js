import React from "react";
import "../styles/components/TripCreation.scss";
// import { commentInputToState } from "../actions/phil";
class Comments extends React.Component {
  render() {
    const comments = this.props.comments;
    const suggestionId = this.props.suggestionId;
    return (
      <ul>
        {comments
          .filter(comment => comment.suggestion_id === suggestionId)
          .map(comment => {
            return (
              <React.Fragment key={comment.id}>
                <section className="comments">
                  <li>
                    {comment.comment}
                    {comment.first_name}{" "}
                  </li>
                </section>
              </React.Fragment>
            );
          })}
      </ul>
    );
  }
}

export default Comments;
