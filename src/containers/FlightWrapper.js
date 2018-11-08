import { connect } from 'react-redux';
import Flight from '../components/Flight';
import {fetchFlights, setEndDate, setStartDate} from '../actions/tomactions';

const mapStateToProps = state => {
    return {
        flightResults: state.flightAPIResults,
        startDate: state.startDate,
        endDate: state.endDate
    }
};

//Currently only one way flights, need to do round trip

// price is in .price
//departure time is in .dTimeUTC
//arrival time is in .aTimeUTC
//flight duration is in .fly_duration
// city from is .cityFrom
//city to is .cityTo
// bags price is an object in .bags_price. Numbered 1 and 2.

//UTC timezones.
//Need list of timezone deviance from UTC
//Need number of seconds in an hour (3600)


const mapDispatchToProps = dispatch => {
    return {
        fetchFlights: () => dispatch(fetchFlights()),
        setStartDate: (date) => dispatch(setStartDate(date)),
        setEndDate: (date) => dispatch(setEndDate(date))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Flight);