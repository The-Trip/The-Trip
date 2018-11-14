import React from "react";
import DatePicker from "react-datepicker";
import "../styles/base/datepicker.scss";
import "../styles/components/flights.scss";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import FlightResultsWrapper from "../containers/FlightResultsWrapper";
import cx from "classnames";

class Flight extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedAirportFromIATA: null,
      selectedAirportToIATA: null,
      airportToOptions: [],
      airportFromOptions: [],
      flightSubmit: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.promiseOptions = this.promiseOptions.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (
      this.state.selectedAirportToIATA &&
      this.state.selectedAirportFromIATA
    ) {
      this.props.isAPILoading();

      let flightOutDateInput = this.props.startDate.format("DD/MM/YYYY");
      let returnFlightDateInput = this.props.endDate.format("DD/MM/YYYY");
      let airportFrom = this.state.selectedAirportFromIATA;
      let airportTo = this.state.selectedAirportToIATA;

      this.props.fetchFlights(
        airportFrom,
        airportTo,
        flightOutDateInput,
        returnFlightDateInput
      );
      this.setState({ flightSubmit: true });
      this.props.removeClickedClass();
    } else {
      alert("Pick a To and From Airport");
    }
  }

  promiseOptions(inputValue) {
    return fetch(`/api/airports?query=${inputValue}`).then(data => data.json());
  }

  render() {
    const datePickers = cx("flights__datePickers", {
      "item--open": this.props.clicked,
      "item--closed": !this.props.clicked
    });

    return (
      <section className="flights container">
        <header className="flights__header">
          <h1 className="flights__title">Find a flight</h1>
        </header>
        <form onSubmit={this.handleSubmit} className="search__form">
          <AsyncTypeahead
            placeholder="From:"
            isLoading={this.state.airportFromLoading}
            onSearch={query => {
              this.setState({ airportFromLoading: true });
              this.promiseOptions(query).then(airports => {
                this.setState({
                  airportFromLoading: false,
                  airportFromOptions: airports
                });
              });
            }}
            options={this.state.airportFromOptions}
            onChange={selected => {
              console.log("SELECTED:", selected);
              this.setState({
                selectedAirportFromIATA: selected[0] && selected[0].iata
              });
            }}
          />
          <AsyncTypeahead
            placeholder="To:"
            isLoading={this.state.airportToLoading}
            onSearch={query => {
              this.setState({ airportToLoading: true });
              this.promiseOptions(query).then(airports => {
                this.setState({
                  airportToLoading: false,
                  airportToOptions: airports
                });
              });
            }}
            options={this.state.airportToOptions}
            onChange={selected => {
              console.log("SELECTED:", selected);
              this.setState({
                selectedAirportToIATA: selected[0] && selected[0].iata
              });
            }}
          />
          <h3>
            Select Journey Dates&nbsp;
            <i
              onClick={event => {
                this.props.clicked
                  ? this.props.removeClickedClass()
                  : this.props.addClickedClass();
              }}
              className="fas fa-plus-square"
            />
          </h3>

          <div className={datePickers}>
            <h3>Outbound Date&nbsp;</h3>

            <div className="myDatePickerContainer myDatePickerStart">
              <DatePicker
                selected={this.props.startDate}
                selectsStart
                startDate={this.props.startDate}
                endDate={this.props.endDate}
                onChange={date => this.props.setStartDate(date)}
                locale="en-gb"
                autoComplete="off"
                placeholderText="Start date"
                inline
              />
            </div>

            <h3>Return Date&nbsp;</h3>

            <div className="myDatePickerContainer myDatePickerEnd">
              <DatePicker
                selected={this.props.endDate}
                selectsEnd
                startDate={this.props.startDate}
                endDate={this.props.endDate}
                onChange={date => this.props.setEndDate(date)}
                placeholderText="End date"
                locale="en-gb"
                autoComplete="off"
                inline
                // popperPlacement="top-end"
                // popperModifiers={{
                //     offset: {
                //         enabled: true,
                //         offset: '5px, 1rem'
                //     },
                //     preventOverflow: {
                //         enabled: true,
                //         escapeWithReference: false,
                //         boundariesElement: 'viewport'
                //     }
                // }}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-submit">
            Search Flights
          </button>
        </form>
        {this.state.flightSubmit ? <FlightResultsWrapper /> : null}
      </section>
    );
  }
}

export default Flight;
