import React from 'react';
import DatePicker from "react-datepicker";
import '../styles/datepicker.scss';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';

class Flight extends React.Component{
    constructor(){
        super();
        this.state = {
            selectedAirportFromIATA: null,
            selectedAirportToIATA: null,
            airportToOptions: [],
            airportFromOptions: []
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.promiseOptions = this.promiseOptions.bind(this)
    }

    handleSubmit(event){
        event.preventDefault();
        if (this.state.selectedAirportToIATA && this.state.selectedAirportFromIATA) {

            let flightOutDateInput = this.props.startDate.format("DD/MM/YYYY");
            let returnFlightDateInput = this.props.endDate.format("DD/MM/YYYY");




            console.log("HOLIDAY WITH DETAILS");
            console.log(`Date Flying Out - ${flightOutDateInput}`);
            console.log(`Return Flight - ${returnFlightDateInput}`);
            console.log(`Airport From - ${this.state.selectedAirportFromIATA}`);
            console.log(`Airport To - ${this.state.selectedAirportToIATA}`)
        }
    }

    flightsAPIFetch(){

    }

    promiseOptions(inputValue) {
       return fetch(`/api/airports?query=${inputValue}`)
            .then(data => data.json())
    };

    render() {
            return (
                <div>
                    <p>Flight Component</p>
                    <form onSubmit={this.handleSubmit} className="search__form">
                        <div className="search__dates">
                            <p>Outbound Journey Date</p>
                            <div className="myDatePickerContainer myDatePickerStart">
                                <DatePicker
                                    selected={this.props.startDate}
                                    selectsStart
                                    startDate={this.props.startDate}
                                    endDate={this.props.endDate}
                                    onChange={(date) => this.props.setStartDate(date)}
                                    locale="en-gb"
                                    autoComplete="off"
                                    placeholderText="Start date"
                                />
                            </div>
                            <p>Return Journey Date</p>
                            <div className="myDatePickerContainer myDatePickerEnd">
                                <DatePicker
                                    selected={this.props.endDate}
                                    selectsEnd
                                    startDate={this.props.startDate}
                                    endDate={this.props.endDate}
                                    onChange={(date) => this.props.setEndDate(date)}
                                    placeholderText="End date"
                                    locale="en-gb"
                                    autoComplete="off"
                                    popperPlacement="top-end"
                                    popperModifiers={{
                                        offset: {
                                            enabled: true,
                                            offset: '5px, 1rem'
                                        },
                                        preventOverflow: {
                                            enabled: true,
                                            escapeWithReference: false,
                                            boundariesElement: 'viewport'
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <AsyncTypeahead
                            placeholder="To:"
                            isLoading={this.state.airportToLoading}
                            onSearch={query => {
                                this.setState({ airportToLoading: true });
                                this.promiseOptions(query)
                                    .then(airports => {
                                        this.setState({
                                            airportToLoading: false,
                                            airportToOptions: airports
                                        })
                                    })
                            }}
                            options={this.state.airportToOptions}
                            onChange={selected => {
                                console.log('SELECTED:', selected);
                                this.setState({
                                    selectedAirportToIATA: selected[0].iata
                                })
                            }}
                        />
                        <AsyncTypeahead
                            placeholder= "From:"
                            isLoading={this.state.airportFromLoading}
                            onSearch={query => {
                                this.setState({ airportFromLoading: true });
                                this.promiseOptions(query)
                                    .then(airports => {
                                        this.setState({
                                            airportFromLoading: false,
                                            airportFromOptions: airports
                                        })
                                    })
                            }}
                            options={this.state.airportFromOptions}
                            onChange={selected => {
                                console.log('SELECTED:', selected);
                                this.setState({
                                    selectedAirportFromIATA: selected[0].iata
                                })
                            }}
                        />
                        <button type="submit" className="Submit-button">Search Flights</button>
                    </form>
                </div>
            )
        }
}

export default Flight