import { connect } from 'react-redux';
import FlightResults from '../components/FlightResults';

const mapStateToProps = state => {
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