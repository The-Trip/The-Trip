import { connect } from 'react-redux';
import FlightResults from '../components/FlightResults';
import {fetchFlightsFromDB} from "../actions/tomactions"

export const mapStateToProps = state => {
    return {
        flightResults: state.flightAPIResults.data,
        isAPILoading: state.isAPILoading,
        startDate: state.startDate,
        endDate: state.endDate,
    }
};

const mapDispatchToProps = {
    fetchFlightsFromDB
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FlightResults);