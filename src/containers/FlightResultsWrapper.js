import { connect } from 'react-redux';
import FlightResults from '../components/FlightResults';

const mapStateToProps = state => {
    console.log(state.flightAPIResults[1]);

    return {
        flightResults: state.flightAPIResults.data,
        isAPILoading: state.isAPILoading
    }
};

export default connect(
    mapStateToProps
)(FlightResults);