import React from 'react';
import DatePicker from "react-datepicker";
import '../styles/datepicker.scss';

class Flight extends React.Component{
    constructor(){
        super();
    }

    componentDidMount(){
        this.props.fetchFlights();
    }

    render() {
            return (
                <div>
                    <p>Flight Component</p>
                    <form onSubmit={this.handleSubmit} className="search__form">
                        <input
                            placeholder="Destination"
                            name="city"
                            autoComplete="off"
                        />
                        <div className="search__dates">

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
                        <button type="submit" className="Submit-button">Submit</button>
                    </form>
                </div>
            )
        }
}

export default Flight