import {mapStateToProps} from '../../src/containers/FlightResultsWrapper.js'

describe('mapStateToProps', () => {
    it('should extract flight results, APILoading, Start and End Date from state', () => {

        const state = {
            flightAPIResults: {
                data: [
                    {flightData: 1},
                    {flightData: 2},
                    {flightData: 3}]
            },
            endDate: "15/11/2018",
            startDate: "12/11/2018",
            isAPILoading: false
        };

        const expectedOutput = {
            flightResults: [{flightData: 1}, {flightData: 2}, {flightData: 3}],
            isAPILoading: false,
            startDate: "12/11/2018",
            endDate: "15/11/2018",
        };

        const output = mapStateToProps(state);

        expect(output).toEqual(expectedOutput)

    })
});
