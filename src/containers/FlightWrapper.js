import { connect } from 'react-redux';
import Flight from '../components/Flight';
import {fetchFlights, isAPILoading, setEndDate, setStartDate} from '../actions/tomactions';


const mapStateToProps = state => {
    return {
        flightResults: state.flightAPIResults.data,
        startDate: state.startDate,
        endDate: state.endDate,
        isAPILoading: state.isAPILoading,
        cityFrom : state.cityFrom,
        cityTo: state.cityTo
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchFlights: (flyFrom, flyTo, dateFrom, dateTo) => dispatch(fetchFlights(flyFrom, flyTo, dateFrom, dateTo)),
        setStartDate: (date) => dispatch(setStartDate(date)),
        setEndDate: (date) => dispatch(setEndDate(date)),
        isAPILoading: () => dispatch(isAPILoading())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Flight);