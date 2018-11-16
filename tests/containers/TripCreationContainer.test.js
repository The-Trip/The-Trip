import {mapStateToProps} from '../../src/containers/TripCreationContainer.js'

describe('mapStateToProps', () => {
    it('should extract addedTripId from state', () => {

        const state = {
            addedTripId: 2
        };

        const expectedOutput = {
            addedTripId: 2
        };

        const output = mapStateToProps(state);

        expect(output).toEqual(expectedOutput)

    })
});