import { connect } from "react-redux";
import TripItem from  "../components/TripItem";
import { fetchImageFromUnsplash } from "../actions/mel";

const mapStateToProps = state => {
    return {
        image: state.image
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetchImageFromUnsplash: () => 
            dispatch(fetchImageFromUnsplash()) 
    }
}
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(TripItem);