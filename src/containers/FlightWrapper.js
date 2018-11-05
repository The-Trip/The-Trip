import { connect } from 'react-redux';
import Flight from '../components/Flight';
import { fetchFlights } from '../actions/tomactions';

const mapStateToProps = state => {
    return {
        flightResults: state.flightAPIResults,
    }
};

// price is in .price
//departure time is in .dTimeUTC
//arrival time is in .aTimeUTC
//flight duration is in .fly_duration
// city from is .cityFrom
//city to is .cityTo
// bags price is an object in .bags_price. Numbered 1 and 2.

const mapDispatchToProps = dispatch => {
    return {
        fetchFlights: () => dispatch(fetchFlights()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Flight);