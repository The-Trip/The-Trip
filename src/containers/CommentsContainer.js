import { connect } from "react-redux";
import Comments from "../components/Comments.js";

const mapStateToProps = state => {
  return {
    comments: state.comments
  };
};

export default connect(mapStateToProps)(Comments);
