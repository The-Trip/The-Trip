import {mapStateToProps} from '../../src/containers/FlightWrapper.js'

describe('mapStateToProps', () => {
    it('should extract flight results,Start and End Date, isAPILoading, cityTo and CityFrom from state', () => {

        const state = {
            flightAPIResults: {
                data: [
                    {flightData: 1},
                    {flightData: 2},
                    {flightData: 3}]
            },
            endDate: "15/11/2018",
            startDate: "12/11/2018",
            isAPILoading: false,
            cityFrom: 'London',
            cityTo: 'New York'
        };

        const expectedOutput = {
            flightResults: [{flightData: 1}, {flightData: 2}, {flightData: 3}],
            isAPILoading: false,
            startDate: "12/11/2018",
            endDate: "15/11/2018",
            cityFrom: 'London',
            cityTo: 'New York'
        };

        const output = mapStateToProps(state);

        expect(output).toEqual(expectedOutput)

    })
});