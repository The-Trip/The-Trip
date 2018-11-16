import { connect } from 'react-redux';
import SelectedTripFlights from '../components/SelectedTripFlights';
import {fetchFlightsFromDB} from "../actions/tomactions";

export const mapStateToProps = (state, ownProps) => {
    const tripId = parseInt(ownProps.match.params.id, 10);

    return {
        tripId,
        flightsFromDB: state.flightsFromDB
    }
};

const mapDispatchToProps = {
    fetchFlightsFromDB
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectedTripFlights);