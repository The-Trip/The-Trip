import { connect } from 'react-redux';
import SelectedTripFlights from '../components/SelectedTripFlights';
import {fetchFlightsFromDB, receiveFlightsFromDB} from "../actions/tomactions";

export const mapStateToProps = state => {

    return {
        flightsFromDB: state.flightsFromDB
    }
};

const mapDispatchToProps = {
    fetchFlightsFromDB,
    receiveFlightsFromDB
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectedTripFlights);