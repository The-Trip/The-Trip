import { connect } from 'react-redux';
import FlightResults from '../components/FlightResults';

export const mapStateToProps = state => {
    return {
        flightResults: state.flightAPIResults.data,
        isAPILoading: state.isAPILoading,
        startDate: state.startDate,
        endDate: state.endDate
    }
};

export default connect(
    mapStateToProps
)(FlightResults);