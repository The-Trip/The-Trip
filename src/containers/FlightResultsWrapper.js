import { connect } from 'react-redux';
import FlightResults from '../components/FlightResults';

export const mapStateToProps = (state, ownProps) => {
    return {
        flightResults: state.flightAPIResults.data,
        isAPILoading: state.isAPILoading,
        startDate: state.startDate,
        endDate: state.endDate,
        tripId: ownProps.tripId
    }
};

export default connect(
    mapStateToProps
)(FlightResults);