import React from "react";
import "../styles/components/TripCreation.scss";
// import { commentInputToState } from "../actions/phil";
class Comments extends React.Component {
  render() {
    const comments = this.props.comments;
    const suggestionId = this.props.suggestionId;
    const commentObj = comments.filter(
      comment => comment.suggestion_id === suggestionId
    );
    return (
      <ul>
        {console.log(commentObj, "commentsObj")}
        {commentObj.length > 0 && (
          <React.Fragment>
            <p>Comments {commentObj.length}</p>
            {commentObj.map(comment => {
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
          </React.Fragment>
        )}
      </ul>
    );
  }
}

export default Comments;
